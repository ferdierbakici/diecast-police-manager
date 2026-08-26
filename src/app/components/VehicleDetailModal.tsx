"use client";

import { useState, type ReactNode } from "react";
import {
  Archive, Box, Calendar, Car, DollarSign, ExternalLink, Factory, Globe,
  Hammer, Locate, Paintbrush, Ruler, ShieldCheck, Star, Tag, X,
} from "lucide-react";
import Image from "next/image";
import { resolveImageUrl } from "@/lib/images";
import {
  getStatusDisplayLabel, getStatusStyle, InstagramIcon, type Vehicle,
} from "@/app/components/vehicle-types";

function DetailRow({ icon, label, value }: { icon: ReactNode; label: string; value: string | null | undefined }) {
  return (
    <div className="flex items-center gap-6 rounded-lg p-3 transition-all hover:bg-black/3">
      <div className="rounded-lg border border-[#433422]/5 bg-white/40 p-4 text-amber-800/60">{icon}</div>
      <div>
        <div className="mb-1 font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#8a7a64]">
          {label}
        </div>
        <div className="text-lg font-semibold tracking-tight text-[#433422]">{value || "-"}</div>
      </div>
    </div>
  );
}

function MiniDetail({ icon, label, value }: { icon: ReactNode; label: string; value: string | null | undefined }) {
  if (!value) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="rounded-lg border border-[#433422]/5 bg-white/40 p-3 text-amber-900/40">{icon}</div>
      <div>
        <div className="mb-1 font-[family-name:var(--font-barlow)] text-[9px] font-bold uppercase tracking-wide text-[#8a7a64]">
          {label}
        </div>
        <div className="text-sm font-semibold tracking-tight text-[#433422]">{value}</div>
      </div>
    </div>
  );
}

function DetailImage({ vehicle }: { vehicle: Vehicle }) {
  const [imageError, setImageError] = useState(false);
  const resolvedImageUrl = resolveImageUrl(vehicle.model_image_cdn || vehicle.model_image);
  const canShowImage = Boolean(resolvedImageUrl) && !imageError;

  return (
    <div className="relative flex min-h-[500px] w-full items-center justify-center bg-[#e6dbbf] md:w-[60%]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(67,52,34,0.03)_0%,_transparent_75%)]" />
      {canShowImage ? (
        <div className="relative h-full min-h-[600px] w-full">
          <Image
            src={resolvedImageUrl!}
            alt={vehicle.model_name || "Vehicle image"}
            fill
            className="object-contain p-12 transition-transform duration-700"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center text-[#433422] opacity-30">
          <Car size={120} />
          <span className="mt-8 text-xs font-bold uppercase tracking-[0.3em]">{imageError ? "No Image" : "Loading"}</span>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status, className }: { status: string | null | undefined; className?: string }) {
  const style = getStatusStyle(status);
  const label = getStatusDisplayLabel(status);
  return (
    <div className={`${className || "mb-14"} inline-flex items-center gap-4 rounded-md px-6 py-3 text-[12px] font-bold uppercase tracking-wider shadow-sm ${style.bg} ${style.color}`}>
      {style.icon} {label}
    </div>
  );
}

export default function VehicleDetailModal({
  vehicle,
  onClose,
}: {
  vehicle: Vehicle;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/50 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-modal-in relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-[#433422]/10 bg-[#faf4e0] shadow-2xl md:flex-row"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-6 top-6 z-40 rounded-full border border-black/10 bg-white/60 p-3 text-black shadow-xl transition-all hover:bg-black hover:text-white"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <DetailImage vehicle={vehicle} />

        <div className="relative flex w-full flex-col overflow-y-auto border-l border-[#433422]/5 bg-[#faf4e0] p-10 md:w-[40%]">
          <div className="mb-16 flex-1">
            <div className="flex items-center justify-between mb-12">
              <StatusBadge status={vehicle.availability_status} className="mb-0" />
              <div className="rounded-lg border border-[#433422]/10 bg-white/40 px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] font-black tracking-wider text-[#433422] shadow-sm">
                MODEL ID: #{vehicle.id}
              </div>
            </div>
            <div className="mb-4 flex items-center gap-4">
              <span className="text-3xl">{vehicle.countries?.flag_emoji}</span>
              <span className="font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">Origin</span>
            </div>
            <h2 className="mb-8 font-[family-name:var(--font-playfair)] text-3xl font-black leading-tight text-[#433422]">
              {vehicle.model_name}
            </h2>
            <div className="mt-12 flex flex-wrap gap-4">
              <span className="rounded-lg bg-black/5 px-5 py-2 font-[family-name:var(--font-mono)] text-[11px] font-bold tracking-wider text-[#433422]">
                Scale {vehicle.scale}
              </span>
              {vehicle.model_year ? (
                <span className="rounded-lg border border-amber-600/10 bg-amber-600/10 px-5 py-2 text-[11px] font-bold tracking-wider text-amber-800">
                  Arrived {vehicle.model_year}
                </span>
              ) : null}
            </div>
            <div className="mt-16 grid grid-cols-1 gap-6">
              <DetailRow icon={<Globe size={20} className="text-amber-700" />} label="Country" value={vehicle.countries?.name} />
              <DetailRow icon={<ShieldCheck size={20} className="text-rose-800" />} label="Agency" value={vehicle.emergency_service} />
              <DetailRow icon={<Tag size={20} className="text-zinc-600" />} label="Manufacturer" value={vehicle.manufacturers?.name || "Unknown"} />
              <DetailRow icon={<Car size={20} className="text-amber-800" />} label="Brand" value={vehicle.vehicle_brands?.name || "Unknown"} />
            </div>
            <div className="mt-16 border-t border-[#433422]/5 pt-8">
              <h4 className="mb-8 font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">Display Info</h4>
              <div className="grid grid-cols-2 gap-6">
                <MiniDetail icon={<Archive size={16} />} label="Showcase" value={vehicle.showcase_num} />
                <MiniDetail icon={<Locate size={16} />} label="Shelf" value={vehicle.shelf_num} />
                <MiniDetail icon={<Box size={16} />} label="Box" value={vehicle.box_num} />
                <MiniDetail icon={<Tag size={16} />} label="Exhibit Type" value={vehicle.exhibition_type} />
              </div>
            </div>
            <div className="mt-14 border-t border-[#433422]/5 pt-8">
              <h4 className="mb-8 font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">Details</h4>
              <div className="grid grid-cols-2 gap-6">
                <MiniDetail icon={<Paintbrush size={16} />} label="Primary Color" value={vehicle.color} />
                <MiniDetail icon={<Hammer size={16} />} label="Material" value={vehicle.material} />
                <MiniDetail
                  icon={<Ruler size={16} />}
                  label="Model Length"
                  value={vehicle.model_length ? `${vehicle.model_length} ${vehicle.model_length_unit || "cm"}` : null}
                />
                <MiniDetail
                  icon={<Star size={16} className="text-amber-600" />}
                  label="Rating"
                  value={vehicle.rating ? `${vehicle.rating} / 5` : "Unrated"}
                />
              </div>
            </div>
            <div className="mt-14 border-t border-[#433422]/5 pt-8">
              <h4 className="mb-8 font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-[0.3em] text-[#8a7a64]">Purchase Info</h4>
              <div className="grid grid-cols-1 gap-6">
                <MiniDetail icon={<Calendar size={16} />} label="Added" value={vehicle.acquisition_date} />
                <MiniDetail
                  icon={<DollarSign size={16} />}
                  label="Price"
                  value={vehicle.market_value ? `${vehicle.market_value} ${vehicle.currency || "USD"}` : null}
                />
                <MiniDetail icon={<Factory size={16} />} label="Seller" value={vehicle.acquired_from} />
              </div>
            </div>
            {vehicle.notes ? (
              <div className="relative mt-16 rounded-lg border border-[#433422]/5 border-l-4 border-l-amber-600/20 bg-white/20 p-6 text-base italic leading-relaxed text-[#8a7a64] transition-all hover:border-l-amber-600">
                <span className="absolute -top-3 left-8 bg-[#faf4e0] px-4 font-[family-name:var(--font-barlow)] text-[10px] font-bold uppercase tracking-wider text-[#8a7a64]">Notes</span>
                <span>&quot;{vehicle.notes}&quot;</span>
              </div>
            ) : null}
          </div>

          <div className="flex gap-3">
            {vehicle.instagram_url ? (
              <a
                href={vehicle.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-4 rounded-lg bg-amber-900 px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-amber-800"
              >
                <InstagramIcon size={18} />
                <span>IG Profile</span>
              </a>
            ) : null}
            {vehicle.website_url ? (
              <a
                href={vehicle.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-4 rounded-lg bg-amber-700 px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-amber-600"
              >
                <ExternalLink size={18} />
                <span>Official Link</span>
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
