"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type StatusValue = "collection" | "wishlist" | null;

export default function CollectionWishlistButtons({
  vehicleId,
  onChange,
}: {
  vehicleId: number;
  onChange?: () => void;
}) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [myStatus, setMyStatus] = useState<StatusValue>(null);
  const [counts, setCounts] = useState({ collection_count: 0, wishlist_count: 0 });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (cancelled) return;
      setUserId(userData.user?.id ?? null);
      setAuthChecked(true);

      if (userData.user) {
        const { data: statusRow } = await supabase
          .from("user_model_status")
          .select("status")
          .eq("user_id", userData.user.id)
          .eq("vehicle_id", vehicleId)
          .maybeSingle();
        if (!cancelled) setMyStatus((statusRow?.status as StatusValue) ?? null);
      } else {
        setMyStatus(null);
      }

      const { data: statsRow } = await supabase
        .from("model_stats")
        .select("collection_count, wishlist_count")
        .eq("vehicle_id", vehicleId)
        .maybeSingle();
      if (!cancelled && statsRow) {
        setCounts({
          collection_count: statsRow.collection_count ?? 0,
          wishlist_count: statsRow.wishlist_count ?? 0,
        });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [vehicleId]);

  async function refreshCounts() {
    const { data: statsRow } = await supabase
      .from("model_stats")
      .select("collection_count, wishlist_count")
      .eq("vehicle_id", vehicleId)
      .maybeSingle();
    if (statsRow) {
      setCounts({
        collection_count: statsRow.collection_count ?? 0,
        wishlist_count: statsRow.wishlist_count ?? 0,
      });
    }
  }

  async function handleToggle(target: "collection" | "wishlist") {
    if (!authChecked) return;
    if (!userId) {
      router.push("/auth/login");
      return;
    }

    setBusy(true);
    try {
      if (myStatus === target) {
        await supabase
          .from("user_model_status")
          .delete()
          .eq("user_id", userId)
          .eq("vehicle_id", vehicleId);
        setMyStatus(null);
      } else {
        await supabase
          .from("user_model_status")
          .upsert(
            { user_id: userId, vehicle_id: vehicleId, status: target },
            { onConflict: "user_id,vehicle_id" }
          );
        setMyStatus(target);
      }
      await refreshCounts();
      onChange?.();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex gap-3">
      <button
        type="button"
        disabled={busy}
        onClick={() => handleToggle("collection")}
        className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-lg px-5 py-4 text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-60 ${
          myStatus === "collection"
            ? "bg-emerald-700 text-white hover:bg-emerald-800"
            : "bg-black/5 text-[#433422] hover:bg-black/10"
        }`}
      >
        <span>{myStatus === "collection" ? "✓ In My Collection" : "Add to My Collection"}</span>
        <span className="text-[9px] font-medium normal-case tracking-normal opacity-70">
          {counts.collection_count} collector{counts.collection_count === 1 ? "" : "s"}
        </span>
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => handleToggle("wishlist")}
        className={`flex flex-1 flex-col items-center justify-center gap-1 rounded-lg px-5 py-4 text-[10px] font-bold uppercase tracking-wider shadow-sm transition-all disabled:opacity-60 ${
          myStatus === "wishlist"
            ? "bg-orange-600 text-white hover:bg-orange-700"
            : "bg-black/5 text-[#433422] hover:bg-black/10"
        }`}
      >
        <span>{myStatus === "wishlist" ? "★ On My Wishlist" : "Add to My Wishlist"}</span>
        <span className="text-[9px] font-medium normal-case tracking-normal opacity-70">
          {counts.wishlist_count} wishing
        </span>
      </button>
    </div>
  );
}
