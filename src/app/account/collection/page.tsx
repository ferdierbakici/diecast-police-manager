"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import VehicleCard from "@/app/components/VehicleCard";
import VehicleDetailModal from "@/app/components/VehicleDetailModal";
import type { Vehicle } from "@/app/components/vehicle-types";
import { Car } from "lucide-react";

export default function MyCollectionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

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
      .eq("status", "collection");

    const vehicleIds = (statusRows ?? []).map((row) => row.vehicle_id);

    if (vehicleIds.length === 0) {
      setVehicles([]);
      setLoading(false);
      return;
    }

    const { data: vehicleRows } = await supabase
      .from("vehicles")
      .select("*, countries(*), vehicle_brands(*), manufacturers(*), series(*)")
      .in("id", vehicleIds);

    setVehicles((vehicleRows as Vehicle[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-2 font-[family-name:var(--font-playfair)] text-3xl font-black text-[#433422]">
        My Collection
      </h1>
      <p className="mb-10 text-sm text-[#8a7a64]">
        Vehicles you&apos;ve marked as part of your own collection.
      </p>

      {loading ? (
        <p className="text-sm text-[#8a7a64]">Loading...</p>
      ) : vehicles.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-[#433422]/8 bg-white/30 px-8 py-20 text-center">
          <Car size={48} className="text-[#433422]/20" />
          <p className="text-sm text-[#8a7a64]">
            You haven&apos;t added any vehicles to your collection yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={setSelectedVehicle} onStatusChange={load} />
          ))}
        </div>
      )}

      {selectedVehicle ? (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
          onStatusChange={load}
        />
      ) : null}
    </div>
  );
}
