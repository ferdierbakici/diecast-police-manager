"use client";

import { Check, Star } from "lucide-react";
import { useCollectionWishlistStatus } from "@/lib/useCollectionWishlistStatus";

export default function CollectionWishlistIcons({
  vehicleId,
  onChange,
}: {
  vehicleId: number;
  onChange?: () => void;
}) {
  const { myStatus, busy, toggle } = useCollectionWishlistStatus(vehicleId, onChange);

  return (
    <div
      className="absolute right-3 top-3 z-20 flex gap-2"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        disabled={busy}
        onClick={() => toggle("collection")}
        title={myStatus === "collection" ? "Remove from My Collection" : "Add to My Collection"}
        className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-all disabled:opacity-60 ${
          myStatus === "collection"
            ? "bg-emerald-700 text-white"
            : "bg-white/90 text-[#433422] hover:bg-white"
        }`}
      >
        <Check size={14} strokeWidth={3} />
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={() => toggle("wishlist")}
        title={myStatus === "wishlist" ? "Remove from My Wishlist" : "Add to My Wishlist"}
        className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-all disabled:opacity-60 ${
          myStatus === "wishlist"
            ? "bg-orange-600 text-white"
            : "bg-white/90 text-[#433422] hover:bg-white"
        }`}
      >
        <Star size={14} fill={myStatus === "wishlist" ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
