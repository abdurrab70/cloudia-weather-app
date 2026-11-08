import { useState } from "react";
import LocationModal from "../components/LocationModal";
import { MapPin, ArrowRight } from "lucide-react";

export default function Home() {
  const [click, setClick] = useState(false);

  return (
    <div className="relative flex-1 w-full flex items-center justify-center px-5 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="w-full max-w-xl mx-auto text-center">
        {/* ===== Top Spacer Icon ===== */}
        <div className="relative flex justify-center mb-6 sm:mb-8">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 via-blue-500/25 to-cyan-500/30 blur-3xl scale-150" />
          </div>
        </div>

        {/* ===== Title ===== */}
        <h1 className="text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] sm:leading-[1.05] mb-4 sm:mb-5">
          <span className="text-blue-400 font-light">Cloudia</span>
          <span className="text-white font-semibold"> Weather</span>
        </h1>

        {/* ===== Subtitle ===== */}
        <p className="text-sm sm:text-base text-white/50 font-normal max-w-[280px] sm:max-w-sm mx-auto leading-relaxed mb-8 sm:mb-10">
          Your real-time weather companion — accurate, elegant, and always with
          you.
        </p>

        {/* ===== Divider ===== */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
          <div className="h-px w-10 sm:w-12 bg-gradient-to-r from-transparent to-white/20" />
          <MapPin
            className="w-3.5 h-3.5 text-cyan-300/70 shrink-0"
            strokeWidth={1.8}
          />
          <div className="h-px w-10 sm:w-12 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* ===== Button ===== */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setClick(true)}
            className="group inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 sm:px-8 py-3.5 rounded-full bg-white/[0.06] border border-white/[0.14] text-white text-sm sm:text-base font-semibold tracking-wide transition-all duration-300 active:scale-[0.97]"
          >
            <span>Check Weather</span>
            <ArrowRight
              className="w-4 h-4 text-white/70 group-hover:text-cyan-300 group-hover:translate-x-[2px] transition-all duration-300"
              strokeWidth={2}
            />
          </button>
        </div>
      </div>

      {/* ===== Modal ===== */}
      {click && <LocationModal onClose={() => setClick(false)} />}
    </div>
  );
}
