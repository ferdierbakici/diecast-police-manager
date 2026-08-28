"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export type StatusValue = "collection" | "wishlist" | null;

export function useCollectionWishlistStatus(vehicleId: number, onChange?: () => void) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [myStatus, setMyStatus] = useState<StatusValue>(null);
  const [counts, setCounts] = useState({ collection_count: 0, wishlist_count: 0 });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (cancelled) return;
      if (userErr) {
        console.error("[collection-wishlist] getUser failed:", userErr.message);
      }
      setUserId(userData.user?.id ?? null);
      setAuthChecked(true);

      if (userData.user) {
        const { data: statusRow, error: statusErr } = await supabase
          .from("user_model_status")
          .select("status")
          .eq("user_id", userData.user.id)
          .eq("vehicle_id", vehicleId)
          .maybeSingle();
        if (statusErr) {
          console.error("[collection-wishlist] fetch status failed:", statusErr.message);
        }
        if (!cancelled) setMyStatus((statusRow?.status as StatusValue) ?? null);
      } else {
        setMyStatus(null);
      }

      const { data: statsRow, error: statsErr } = await supabase
        .from("model_stats")
        .select("collection_count, wishlist_count")
        .eq("vehicle_id", vehicleId)
        .maybeSingle();
      if (statsErr) {
        console.error("[collection-wishlist] fetch stats failed:", statsErr.message);
      }
      if (!cancelled) {
        setCounts({
          collection_count: statsRow?.collection_count ?? 0,
          wishlist_count: statsRow?.wishlist_count ?? 0,
        });
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [vehicleId]);

  async function refreshCounts() {
    const { data: statsRow, error: statsErr } = await supabase
      .from("model_stats")
      .select("collection_count, wishlist_count")
      .eq("vehicle_id", vehicleId)
      .maybeSingle();
    if (statsErr) {
      console.error("[collection-wishlist] refresh stats failed:", statsErr.message);
      return;
    }
    setCounts({
      collection_count: statsRow?.collection_count ?? 0,
      wishlist_count: statsRow?.wishlist_count ?? 0,
    });
  }

  async function toggle(target: "collection" | "wishlist") {
    if (!authChecked) return;
    if (!userId) {
      router.push("/auth/login");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      if (myStatus === target) {
        const { error: delErr } = await supabase
          .from("user_model_status")
          .delete()
          .eq("user_id", userId)
          .eq("vehicle_id", vehicleId);
        if (delErr) {
          console.error("[collection-wishlist] delete failed:", delErr.message, delErr);
          setError(delErr.message);
          return;
        }
        setMyStatus(null);
      } else {
        const { error: upsertErr } = await supabase
          .from("user_model_status")
          .upsert(
            { user_id: userId, vehicle_id: vehicleId, status: target },
            { onConflict: "user_id,vehicle_id" }
          );
        if (upsertErr) {
          console.error("[collection-wishlist] upsert failed:", upsertErr.message, upsertErr);
          setError(upsertErr.message);
          return;
        }
        setMyStatus(target);
      }
      await refreshCounts();
      onChange?.();
    } finally {
      setBusy(false);
    }
  }

  return { myStatus, counts, busy, error, toggle };
}
