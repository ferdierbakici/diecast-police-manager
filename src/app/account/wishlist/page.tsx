"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import VehicleCard from "@/app/components/VehicleCard";
import VehicleDetailModal from "@/app/components/VehicleDetailModal";
import type { Vehicle } from "@/app/components/vehicle-types";
import { Star } from "lucide-react";

export default function MyWishlistPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        router.push("/auth/login");
        return;
      }

      const { data: statusRows } = await supabase
        .from("user_model_status")
        .select("vehicle_id")
        .eq("user_id", userData.user.id)
        .eq("status", "wishlist");

      const vehicleIds = (statusRows ?? []).map((row) => row.vehicle_id);

      if (vehicleIds.length === 0) {
        setVehicles([]);
        setLoading(false);
        return;
      }

      const { data: vehicleRows } = await supabase
        .from("vehicles")
        .select("*, countries(*), vehicle_brands(*), manufacturers(*)")
        .in("id", vehicleIds);

      setVehicles((vehicleRows as Vehicle[]) ?? []);
      setLoading(false);
    }
    load();
  }, [router]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-2 font-[family-name:var(--font-playfair)] text-3xl font-black text-[#433422]">
        My Wishlist
      </h1>
      <p className="mb-10 text-sm text-[#8a7a64]">
        Vehicles you&apos;d like to add to your collection.
      </p>

      {loading ? (
        <p className="text-sm text-[#8a7a64]">Loading...</p>
      ) : vehicles.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-[#433422]/8 bg-white/30 px-8 py-20 text-center">
          <Star size={48} className="text-[#433422]/20" />
          <p className="text-sm text-[#8a7a64]">
            Your wishlist is empty. Browse the collection and mark vehicles you want.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={setSelectedVehicle} />
          ))}
        </div>
      )}

      {selectedVehicle ? (
        <VehicleDetailModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      ) : null}
    </div>
  );
}
