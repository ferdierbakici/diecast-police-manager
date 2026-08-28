"use client";

import { useState } from "react";
import { Car, ChevronRight, MapPin, ShieldCheck, Tag } from "lucide-react";
import Image from "next/image";
import { resolveImageUrl } from "@/lib/images";
import { getStatusDisplayLabel, getStatusStyle, type Vehicle } from "@/app/components/vehicle-types";
import CollectionWishlistIcons from "@/app/components/CollectionWishlistIcons";

export default function VehicleCard({
  vehicle,
  onClick,
  onStatusChange,
}: {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
  onStatusChange?: () => void;
}) {
  const [imageError, setImageError] = useState(false);
  const style = getStatusStyle(vehicle.availability_status);
  const resolvedImageUrl = resolveImageUrl(vehicle.model_image_cdn || vehicle.model_image);
  const canShowImage = Boolean(resolvedImageUrl) && !imageError;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(vehicle)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick(vehicle);
        }
      }}
      className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl border border-[#433422]/8 bg-white/30 text-left transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/30 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e6dbbf]">
        <div className={`absolute left-4 top-4 z-20 flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${style.bg} ${style.color}`}>
          {style.icon} {getStatusDisplayLabel(vehicle.availability_status)}
        </div>
        <CollectionWishlistIcons vehicleId={vehicle.id} onChange={onStatusChange} />
        {canShowImage ? (
          <Image
            src={resolvedImageUrl!}
            alt={vehicle.model_name || "Vehicle image"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center text-[#433422]/20">
            <Car size={48} />
            <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em]">{imageError ? "No Image" : "Loading"}</span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 rounded-md bg-white/80 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] font-bold tracking-wider text-[#8a7a64]">
          #{vehicle.id}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="mb-4 font-[family-name:var(--font-playfair)] text-lg font-black leading-tight text-[#433422] transition-colors group-hover:text-amber-700">
            {vehicle.model_name}
          </h3>
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-amber-700">
              <MapPin size={11} />
              <span>{vehicle.countries?.flag_emoji} {vehicle.countries?.name || "Unknown country"}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-[#433422]/70">
              <ShieldCheck size={11} className="text-red-700/60" />
              <span>{vehicle.emergency_service || "Unknown service"}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium text-[#8a7a64]">
              <Tag size={11} />
              <span>{vehicle.manufacturers?.name || "Unknown maker"}</span>
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-[#433422]/5 pt-4">
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-mono)] text-[10px] font-bold uppercase tracking-wider text-[#8a7a64]">
              {vehicle.scale || "Scale n/a"}
            </span>
            <span className="max-w-[140px] truncate text-[11px] font-semibold text-amber-800">
              {vehicle.vehicle_brands?.name || ""}
            </span>
          </div>
          <div className="rounded-lg bg-[#433422]/5 p-2.5 transition-all group-hover:bg-amber-700 group-hover:text-white">
            <ChevronRight size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
