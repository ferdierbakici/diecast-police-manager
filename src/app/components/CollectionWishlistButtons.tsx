"use client";

import { useCollectionWishlistStatus } from "@/lib/useCollectionWishlistStatus";

export default function CollectionWishlistButtons({
  vehicleId,
  onChange,
}: {
  vehicleId: number;
  onChange?: () => void;
}) {
  const { myStatus, counts, busy, error, toggle } = useCollectionWishlistStatus(vehicleId, onChange);

  return (
    <div>
      <div className="flex gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => toggle("collection")}
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
          onClick={() => toggle("wishlist")}
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
      {error ? (
        <p className="mt-2 rounded bg-red-50 px-3 py-2 text-[11px] text-red-700">
          Couldn&apos;t save: {error}
        </p>
      ) : null}
    </div>
  );
}
