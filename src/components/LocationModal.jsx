import { ArrowUpDown, X, MapPin, Search, Navigation } from "lucide-react";
import { useState, useEffect } from "react";
import { getGeoLocations } from "../services/getGeoLocation";
import { useNavigate } from "react-router";

export default function LocationModal({ onClose }) {
  const navigate = useNavigate();
  const goToPage = (location) => {
    navigate("/weather", { state: { location } });
  };

  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  // Modal open হলে background scroll lock + ESC key দিয়ে close
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = city.trim();
    if (!value) {
      setError("Please enter a city name...");
      return;
    }
    try {
      const location = await getGeoLocations(value);
      if (!location) {
        setError("Geocoding Request Failed!");
        return;
      }
      goToPage(location);
    } catch (error) {
      setError(error?.message || "Something went wrong!");
    }
  };

  const handleGeoLocation = () => {
    if (!navigator.geolocation) {
      setError("Geo Locations Not Found!");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        goToPage({ name: "Your Locations", lat: latitude, lon: longitude });
      },
      (error) => {
        setError(error.message);
      },
      { timeout: 10000 },
    );
  };

  return (
    // ===== Backdrop — dark + blur, centered modal =====
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-[fadeIn_200ms_ease-out]"
    >
      {/* ===== Modal Card — centered ===== */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-gradient-to-br from-[#2f2942] to-[#241f36] border border-white/[0.08] rounded-[28px] p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden animate-[scaleIn_250ms_ease-out] max-h-[calc(100vh-2rem)] overflow-y-auto"
      >
        {/* Top highlight */}
        <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* Very subtle top glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-32 bg-purple-500/[0.08] rounded-full blur-3xl pointer-events-none" />

        {/* ===== Header ===== */}
        <div className="relative flex items-start justify-between gap-3 mb-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <MapPin
                className="w-4 h-4 text-purple-300 shrink-0"
                strokeWidth={1.8}
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-purple-200/70">
                Location
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Where are you today?
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            className="group p-2 rounded-full bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.08] hover:border-purple-300/25 transition-all duration-300 active:scale-90 shrink-0"
          >
            <X
              className="w-4 h-4 text-white/60 group-hover:text-white transition-colors"
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* ===== Form ===== */}
        <form onSubmit={handleSubmit} className="relative space-y-3">
          {/* Input with icon */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35 pointer-events-none"
              strokeWidth={1.8}
            />
            <input
              placeholder="Enter city name..."
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                if (error) setError("");
              }}
              autoFocus
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-white placeholder:text-white/30 text-sm font-medium outline-none focus:bg-white/[0.08] focus:border-purple-300/40 transition-all duration-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/25 hover:border-purple-300/40 text-white text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.98]"
          >
            Get Weather
          </button>
        </form>

        {/* ===== Divider ===== */}
        <div className="relative flex items-center justify-center gap-3 my-5">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
          <ArrowUpDown
            className="w-4 h-4 text-white/25 shrink-0"
            strokeWidth={1.8}
          />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
        </div>

        {/* ===== Use My Location ===== */}
        <button
          type="button"
          onClick={handleGeoLocation}
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/15 text-white text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.98]"
        >
          <Navigation
            className="w-4 h-4 text-purple-300 shrink-0"
            strokeWidth={1.8}
          />
          <span>Use My Location</span>
        </button>

        {/* ===== Error ===== */}
        {error && (
          <div className="relative mt-4 px-4 py-3 rounded-2xl bg-red-500/[0.08] border border-red-400/20 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400/80 mt-1.5 shrink-0" />
            <p className="text-xs sm:text-sm text-red-200/90 font-medium leading-relaxed break-words">
              {typeof error === "string"
                ? error
                : error?.message || "Something went wrong"}
            </p>
          </div>
        )}
      </div>

      {/* ===== Animations ===== */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
