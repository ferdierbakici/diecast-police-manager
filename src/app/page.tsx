"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Search, Car, Globe, Tag, Info, Filter, X, Calendar, MapPin, ShieldCheck, Factory, Box, CheckCircle2, Clock, AlertCircle, HelpCircle, ChevronRight, Sparkles, ExternalLink, Archive, DollarSign, Paintbrush, Hammer, Ruler, Locate, Star } from "lucide-react";
import Image from "next/image";

const STATUS_STYLES: Record<string, { color: string, bg: string, icon: any }> = {
  "Not Available": { color: "text-rose-800", bg: "bg-rose-100/80", icon: <X size={12}/> },
  "Wishlist": { color: "text-orange-800", bg: "bg-orange-100/80", icon: <AlertCircle size={12}/> },
  "Ordered": { color: "text-amber-800", bg: "bg-amber-100/80", icon: <Clock size={12}/> },
  "Pre-order": { color: "text-amber-800", bg: "bg-amber-100/80", icon: <Clock size={12}/> },
  "Available": { color: "text-emerald-900", bg: "bg-emerald-100/80", icon: <CheckCircle2 size={12}/> },
  "Available - Displayed": { color: "text-emerald-900", bg: "bg-emerald-100/80", icon: <CheckCircle2 size={12}/> },
  "In Stock": { color: "text-emerald-900", bg: "bg-emerald-100/80", icon: <CheckCircle2 size={12}/> },
  "Unknown": { color: "text-zinc-600", bg: "bg-zinc-100/80", icon: <HelpCircle size={12}/> },
};

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

function VehicleCard({ vehicle, onClick }: { vehicle: any, onClick: (v: any) => void }) {
  const [imageError, setImageError] = useState(false);
  const isValidImg = vehicle.model_image && vehicle.model_image.startsWith("http") && !imageError;
  const style = getStatusStyle(vehicle.availability_status);

  function getStatusStyle(status: string) {
    if (!status || status.trim() === "") return STATUS_STYLES["Unknown"];
    const key = Object.keys(STATUS_STYLES).find(k => status.toLowerCase().includes(k.toLowerCase()));
    return key ? STATUS_STYLES[key] : STATUS_STYLES["Not Available"];
  }

  return (
    <div onClick={() => onClick(vehicle)} className="glass-card overflow-hidden group hover:neon-border transition-all duration-700 cursor-pointer flex flex-col relative border border-[#433422]/10 bg-white/40 shadow-xl">
      <div className={`absolute top-6 left-6 z-20 px-4 py-2 rounded-full flex items-center gap-2.5 ${style.bg} ${style.color} text-[10px] font-black uppercase tracking-[0.2em] shadow-sm border border-black/5 backdrop-blur-3xl`}>
        {style.icon} {vehicle.availability_status || "Not In Stock"}
      </div>
      <div className="aspect-[4/3] bg-[#e6dbbf] relative">
        {isValidImg ? (
          <Image src={vehicle.model_image} alt={vehicle.model_name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-90 group-hover:opacity-100" onError={() => setImageError(true)} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-zinc-900 opacity-20 group-hover:opacity-30">
            <Car size={64} /><span className="text-[11px] mt-5 tracking-[0.6em] uppercase font-black text-gray-700">{imageError ? "Asset Check" : "Syncing..."}</span>
          </div>
        )}
        <div className="absolute bottom-6 right-6 px-4 py-2 bg-white/80 backdrop-blur-3xl text-amber-800 rounded-xl text-[11px] uppercase font-black tracking-widest border border-black/5 shadow-md group-hover:text-amber-600">#{vehicle.id}</div>
      </div>
      <div className="p-10 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-black text-[#433422] text-2xl leading-[1.0] mb-6 group-hover:text-amber-700 transition-colors uppercase italic tracking-tighter drop-shadow-sm">{vehicle.model_name}</h3>
          <div className="space-y-3 mb-8">
             <div className="flex items-center gap-2 text-[12px] text-amber-700 font-black uppercase tracking-widest leading-none">
                <MapPin size={12} /><span>{vehicle.countries?.flag_emoji} {vehicle.countries?.name}</span>
             </div>
             <div className="flex items-center gap-2 text-[11px] text-zinc-900 font-bold uppercase tracking-tight leading-snug">
                <ShieldCheck size={11} className="text-red-700" /><span>{vehicle.emergency_service}</span>
             </div>
             <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-black uppercase tracking-[0.2em] leading-none pt-1 group-hover:text-zinc-900 transition-colors">
                <Tag size={11} className="text-zinc-300" /><span>{vehicle.manufacturers?.name || "Premium Diecast"}</span>
             </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-8 border-t border-black/5 mt-auto">
          <div className="flex flex-col">
             <span className="text-[10px] text-black/20 uppercase font-black tracking-[0.4em] mb-1 leading-none">{vehicle.scale} SCALE</span>
             <span className="text-[11px] text-amber-800 font-black uppercase tracking-widest truncate max-w-[140px]">{vehicle.vehicle_brands?.name || "Official Brand"}</span>
          </div>
          <div className="p-4 bg-black/5 rounded-2xl group-hover:bg-amber-700 group-hover:text-white transition-all shadow-md group-hover:scale-110"><ChevronRight size={20} /></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [manufacturers, setManufacturers] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [emergencyServices, setEmergencyServices] = useState<string[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>("All");
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [selectedService, setSelectedService] = useState<string>("All");

  const [stats, setStats] = useState({ total: 0, countries: 0, brands: 0 });
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    let allVehicles: any[] = [];
    let from = 0; let to = 999; let hasMore = true;

    while (hasMore) {
      const { data } = await supabase.from("vehicles").select(`*, countries (*), vehicle_brands (*), manufacturers (*)`).order("id", { ascending: true }).range(from, to);
      if (data && data.length > 0) {
        allVehicles = [...allVehicles, ...data];
        from += 1000; to += 1000;
        if (data.length < 1000) hasMore = false;
      } else { hasMore = false; }
    }

    if (allVehicles.length > 0) {
      setVehicles(allVehicles);
      setStats({ total: allVehicles.length, countries: new Set(allVehicles.map(v => v.country_id)).size, brands: new Set(allVehicles.map(v => v.vehicle_brand_id)).size });
      
      // UNIQUE FILTERS
      const uniqueCountries = Array.from(new Set(allVehicles.map(v => v.countries?.name).filter(Boolean))).sort() as any[];
      const uniqueManufacturers = Array.from(new Set(allVehicles.map(v => v.manufacturers?.name).filter(Boolean))).sort() as any[];
      const uniqueBrands = Array.from(new Set(allVehicles.map(v => v.vehicle_brands?.name).filter(Boolean))).sort() as any[];
      const uniqueServices = Array.from(new Set(allVehicles.map(v => v.emergency_service).filter(Boolean))).sort() as any[];

      setCountries(uniqueCountries);
      setManufacturers(uniqueManufacturers);
      setBrands(uniqueBrands);
      setEmergencyServices(uniqueServices);
    }
    setLoading(false);
  }

  const filtered = vehicles.filter(v => {
    const matchesSearch = v.model_name?.toLowerCase().includes(search.toLowerCase()) || 
                         v.emergency_service?.toLowerCase().includes(search.toLowerCase()) || 
                         v.countries?.name?.toLowerCase().includes(search.toLowerCase()) || 
                         v.manufacturers?.name?.toLowerCase().includes(search.toLowerCase()) ||
                         v.vehicle_brands?.name?.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = selectedCountry === "All" || v.countries?.name === selectedCountry;
    const matchesManufacturer = selectedManufacturer === "All" || v.manufacturers?.name === selectedManufacturer;
    const matchesBrand = selectedBrand === "All" || v.vehicle_brands?.name === selectedBrand;
    const matchesService = selectedService === "All" || v.emergency_service === selectedService;
    return matchesSearch && matchesCountry && matchesManufacturer && matchesBrand && matchesService;
  });

  return (
    <div className="min-h-screen p-8 bg-[#fdf6e3] text-[#433422] font-sans selection:bg-amber-500/30">
      <div className="max-w-7xl mx-auto mb-16">
        {/* Header */}
        {/* Header with PNG Sign */}
        <div className="flex flex-col items-center mb-16 gap-12 w-full">
          <div className="w-full md:w-[400px] relative drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700">
             <Image src="/museum-sign.png" alt="Diecast Police Museum" width={600} height={400} className="w-full h-auto rounded-[2rem] border-8 border-white/40 sepia-[0.2]" />
          </div>
          
          <div className="flex justify-between items-end w-full flex-wrap gap-10">
            <div>
              <h1 className="text-6xl font-black bg-gradient-to-r from-amber-800 via-orange-700 to-red-900 bg-clip-text text-transparent italic tracking-tighter leading-tight uppercase">Diecast Police Museum</h1>
              <p className="text-zinc-700 mt-4 font-black tracking-[0.4em] text-[10px] uppercase drop-shadow-sm">Official Archive • Master Fleet Control</p>
            </div>
            <div className="flex gap-6">
              <StatCard icon={<Car size={24}/>} label="Total Assets" value={stats.total} color="text-red-800" />
              <StatCard icon={<Globe size={24}/>} label="Regions" value={stats.countries} color="text-emerald-800" />
            </div>
          </div>
        </div>

        {/* ADVANCED KOMUTA MERKEZI (CONTROL PANEL) */}
        <div className="glass-card p-10 border border-black/5 shadow-2xl mb-16 bg-white/50 relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
             <Filter size={120} className="text-black" />
          </div>
          <div className="flex flex-col gap-8">
            {/* Search Top */}
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={24} />
              <input type="text" placeholder="Global Entry Search..." className="w-full bg-black/5 border border-black/5 rounded-3xl h-20 pl-16 pr-8 text-[#433422] outline-none focus:border-amber-600/30 transition-all font-bold text-xl placeholder:text-zinc-600" onChange={(e) => setSearch(e.target.value)} />
            </div>
            
            {/* Multi Filters Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FilterSelect label="Operational Country" options={countries} value={selectedCountry} onChange={setSelectedCountry} />
              <FilterSelect label="Emergency Agency" options={emergencyServices} value={selectedService} onChange={setSelectedService} />
              <FilterSelect label="Diecast Maker" options={manufacturers} value={selectedManufacturer} onChange={setSelectedManufacturer} />
              <FilterSelect label="Vehicle Brand" options={brands} value={selectedBrand} onChange={setSelectedBrand} />
            </div>
            
            {/* Results Count Summary */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/5">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-900">Displaying {filtered.length} matching units</span>
               {(selectedCountry !== "All" || selectedManufacturer !== "All" || selectedBrand !== "All" || selectedService !== "All" || search !== "") && (
                 <button onClick={() => {setSelectedCountry("All"); setSelectedManufacturer("All"); setSelectedBrand("All"); setSelectedService("All"); setSearch("");}} className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 hover:text-white transition-colors flex items-center gap-2">
                   <X size={10}/> Reset System Filters
                 </button>
               )}
            </div>
          </div>
        </div>

        {/* MAIN COLLECTION GRID */}
        <div>
          <div className="flex items-center justify-between mb-12"><div className="flex items-center gap-6"><div className="w-1.5 h-10 bg-black/20 rounded-full" /><h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none text-[#433422] underline decoration-black/10 underline-offset-8">COLLECTION</h2></div></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-balance">
            {loading ? [...Array(8)].map((_, i) => <SkeletonCard key={i} />) : filtered.map((v) => (
               <VehicleCard key={v.id} vehicle={v} onClick={setSelectedVehicle} />
            ))}
          </div>
        </div>
      </div>

      {/* DETAY MODAL */}
      {selectedVehicle && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-8 bg-[#fdf6e3]/98 backdrop-blur-3xl animate-in fade-in duration-500" onClick={() => setSelectedVehicle(null)}>
          <div className="glass-card w-full max-w-7xl max-h-[96vh] overflow-hidden flex flex-col md:flex-row relative neon-border animate-in zoom-in-95 duration-1000 border border-black/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-12 right-12 z-40 p-5 bg-white/60 hover:bg-black hover:text-white rounded-full text-black transition-all border border-black/10 shadow-xl" onClick={() => setSelectedVehicle(null)}><X size={32} /></button>
            <DetailImage vehicle={selectedVehicle} />
            <div className="w-full md:w-[40%] p-24 overflow-y-auto bg-[#faf4e0] border-l border-black/5 flex flex-col relative text-balance">
              <div className="mb-20 flex-1">
                <StatusBadge status={selectedVehicle.availability_status} />
                <div className="flex items-center gap-4 mb-4">
                   <span className="text-4xl">{selectedVehicle.countries?.flag_emoji}</span>
                   <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600 italic">Operational Registry</span>
                </div>
                <h2 className="text-6xl font-black text-[#433422] mb-10 leading-[1.0] uppercase italic tracking-tighter decoration-amber-900/10 underline underline-offset-[20px] decoration-1">{selectedVehicle.model_name}</h2>
                <div className="flex gap-6 mt-16 flex-wrap">
                  <span className="px-8 py-3 bg-black/5 text-zinc-700 rounded-3xl text-[12px] font-black tracking-[0.3em] border border-black/5 uppercase">Scale {selectedVehicle.scale}</span>
                  {selectedVehicle.model_year && <span className="px-8 py-3 bg-amber-600/10 text-amber-800 rounded-3xl text-[12px] font-black tracking-[0.3em] border border-amber-600/10 uppercase italic shadow-sm">Arrived {selectedVehicle.model_year}</span>}
                </div>
                <div className="grid grid-cols-1 gap-14 mt-24">
                  <DetailRow icon={<Globe size={28} className="text-amber-700 grayscale group-hover:grayscale-0 transition-all"/>} label="Country Registry" value={selectedVehicle.countries?.name} />
                  <DetailRow icon={<ShieldCheck size={28} className="text-rose-800 grayscale group-hover:grayscale-0 transition-all"/>} label="Operational Sector" value={selectedVehicle.emergency_service} />
                  <DetailRow icon={<Tag size={28} className="text-zinc-600 grayscale group-hover:grayscale-0 transition-all"/>} label="Model Manufacturer" value={selectedVehicle.manufacturers?.name || "Premium Diecast Edition"} />
                  <DetailRow icon={<Car size={28} className="text-amber-800 grayscale group-hover:grayscale-0 transition-all"/>} label="Vehicle Brand" value={selectedVehicle.vehicle_brands?.name || "Official Brand Manufacturer"} />
                </div>
                
                {/* EXHIBITION & STORAGE */}
                <div className="mt-24 pt-12 border-t border-black/5">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-900/40 mb-10">Exhibition & Logistics</h4>
                   <div className="grid grid-cols-2 gap-8">
                      <MiniDetail icon={<Archive size={16}/>} label="Showcase" value={selectedVehicle.showcase_num} />
                      <MiniDetail icon={<Locate size={16}/>} label="Shelf" value={selectedVehicle.shelf_num} />
                      <MiniDetail icon={<Box size={16}/>} label="Box #" value={selectedVehicle.box_num} />
                      <MiniDetail icon={<Tag size={16}/>} label="Exhib. Type" value={selectedVehicle.exhibition_type} />
                   </div>
                </div>

                {/* PHYSICAL SPECS */}
                <div className="mt-20 pt-12 border-t border-black/5">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-900/40 mb-10">Physical Metadata</h4>
                   <div className="grid grid-cols-2 gap-8">
                      <MiniDetail icon={<Paintbrush size={16}/>} label="Primary Color" value={selectedVehicle.color} />
                      <MiniDetail icon={<Hammer size={16}/>} label="Material" value={selectedVehicle.material} />
                      <MiniDetail icon={<Ruler size={16}/>} label="Model Length" value={selectedVehicle.model_length ? `${selectedVehicle.model_length} ${selectedVehicle.model_length_unit || 'cm'}` : null} />
                      <MiniDetail icon={<Star size={16} className="text-amber-600"/>} label="Museum Rating" value={selectedVehicle.rating ? `${selectedVehicle.rating} / 5` : "Unrated"} />
                   </div>
                </div>

                {/* ACQUISITION LOG */}
                <div className="mt-20 pt-12 border-t border-black/5">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.6em] text-amber-900/40 mb-10">Acquisition Intelligence</h4>
                   <div className="grid grid-cols-1 gap-8">
                      <MiniDetail icon={<Calendar size={16}/>} label="Entry Date" value={selectedVehicle.acquisition_date} />
                      <MiniDetail icon={<DollarSign size={16}/>} label="Market Valuation" value={selectedVehicle.market_value ? `${selectedVehicle.market_value} ${selectedVehicle.currency || 'USD'}` : null} />
                      <MiniDetail icon={<Factory size={16}/>} label="Acquired From" value={selectedVehicle.acquired_from} />
                   </div>
                </div>

                {selectedVehicle.notes && <div className="mt-24 p-12 rounded-[3.5rem] bg-white/20 border border-black/5 shadow-sm italic text-zinc-600 text-lg leading-loose border-l-8 border-l-amber-600/20 relative cursor-default hover:border-l-amber-600 transition-all"><span className="absolute -top-4 left-10 bg-[#faf4e0] px-6 text-[10px] font-black uppercase tracking-[0.6em] text-amber-900/40">Archived Notes</span>"{selectedVehicle.notes}"</div>}
              </div>
              <div className="flex gap-4">
                {selectedVehicle.instagram_url && (
                  <a href={selectedVehicle.instagram_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-6 bg-amber-900 hover:bg-amber-800 text-white py-8 px-8 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-md active:scale-95 group"><InstagramIcon size={24} /><span className="group-hover:translate-x-2 transition-transform">IG Profile</span></a>
                )}
                {selectedVehicle.website_url && (
                  <a href={selectedVehicle.website_url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-6 bg-amber-700 hover:bg-amber-600 text-white py-8 px-8 rounded-[2.5rem] font-black text-[10px] uppercase tracking-[0.4em] transition-all shadow-md active:scale-95 group"><ExternalLink size={24} /><span className="group-hover:translate-x-2 transition-transform">Official Link</span></a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterSelect({ label, options, value, onChange }: any) {
  const typeWord = label.split(' ').pop() || '';
  const pluralWord = typeWord.endsWith('y') ? typeWord.slice(0, -1) + 'ies' : typeWord + 's';

  return (
    <div className="flex flex-col gap-3 group">
      <label className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-900/40 ml-4 group-hover:text-amber-700 transition-colors">{label}</label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/40 border border-black/5 rounded-[1.5rem] h-14 px-6 text-zinc-800 outline-none cursor-pointer hover:border-black/20 transition-all font-bold text-xs uppercase tracking-widest focus:text-zinc-900"
      >
        <option value="All">All {pluralWord}</option>
        {options.map((opt: any) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function DetailImage({ vehicle }: { vehicle: any }) {
  const [error, setError] = useState(false);
  const isValid = vehicle.model_image?.startsWith("http") && !error;
  return (
    <div className="w-full md:w-[60%] bg-[#e6dbbf] flex items-center justify-center min-h-[500px] relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(67,52,34,0.03)_0%,_transparent_75%)]" />
      {isValid ? (
        <div className="relative w-full h-full min-h-[600px] group">
          <Image src={vehicle.model_image} alt={vehicle.model_name} fill className="object-contain p-12 transition-transform duration-1000 drop-shadow-[0_0_50px_rgba(67,52,34,0.05)]" onError={() => setError(true)} />
        </div>
      ) : (
        <div className="text-[#433422] flex flex-col items-center opacity-30">
          <Car size={200} /><span className="mt-12 font-black tracking-[1.5em] uppercase text-xs">{error ? "Asset Error" : "Processing"}</span>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const getStyle = (s: string) => {
    if (!s || s.trim() === "") return STATUS_STYLES["Unknown"];
    const key = Object.keys(STATUS_STYLES).find(k => s.toLowerCase().includes(k.toLowerCase()));
    return key ? STATUS_STYLES[key] : STATUS_STYLES["Not Available"];
  };
  const style = getStyle(status);
  return (
     <div className={`inline-flex items-center gap-4 px-6 py-3 rounded-full text-[12px] font-black uppercase tracking-[0.4em] mb-14 shadow-sm ${style.bg} ${style.color}`}>
        {style.icon} {status || "Archive Log"}
     </div>
  );
}

function MiniDetail({ icon, label, value }: any) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-4 group">
      <div className="p-3 bg-white/40 rounded-xl border border-black/5 text-amber-900/40 group-hover:text-amber-700 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-[9px] text-zinc-600 uppercase tracking-widest font-black leading-none mb-1">{label}</div>
        <div className="text-[#433422] font-bold text-sm tracking-tight">{value}</div>
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-10 group cursor-default hover:bg-black/5 p-4 rounded-3xl transition-all -ml-4"><div className="p-7 bg-white/40 rounded-[2.5rem] border border-black/5 group-hover:border-amber-600/30 transition-all shadow-sm grayscale group-hover:grayscale-0">{icon}</div><div><div className="text-[12px] text-zinc-600 uppercase tracking-[0.5em] font-black mb-4 leading-none opacity-80">{label}</div><div className="text-[#433422] font-bold text-2xl tracking-tighter leading-snug drop-shadow-sm">{value || "Restricted Access"}</div></div></div>
  );
}

function StatCard({ icon, label, value, color }: any) {
  return (
    <div className="glass-card px-14 py-12 flex items-center gap-12 border border-black/5 shadow-xl group relative overflow-hidden"><div className="absolute -bottom-24 -right-24 scale-[5] opacity-[0.01] transition-all duration-1000 grayscale select-none pointer-events-none group-hover:rotate-12 group-hover:opacity-[0.03]">{icon}</div><div className={`${color} p-7 bg-white/40 rounded-[3rem] ring-1 ring-black/5 shadow-sm group-hover:scale-110 transition-all`}>{icon}</div><div><div className="text-6xl font-black text-[#433422] leading-none mb-4 tracking-tighter group-hover:text-amber-700 transition-colors uppercase">{value}</div><div className="text-[11px] text-zinc-700 uppercase font-black tracking-[0.6em] opacity-80 leading-none">{label}</div></div></div>
  );
}

function SkeletonCard() {
  return (
    <div className="glass-card h-[500px] animate-pulse">
      <div className="h-72 bg-white/5" /><div className="p-14 space-y-10"><div className="h-10 w-3/4 bg-white/5 rounded-3xl" /><div className="h-8 w-1/2 bg-white/5 rounded-3xl" /></div>
    </div>
  );
}
