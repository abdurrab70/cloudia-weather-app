import { useLocation, useNavigate } from "react-router";
import { getWeather } from "../services/getWeather";
import { useEffect, useState } from "react";
import {
  MapPin,
  Calendar,
  Clock,
  Wind,
  Droplets,
  Thermometer,
  Sparkles,
  CloudSun,
  ArrowLeft,
} from "lucide-react";

export default function Weather() {
  const value = useLocation();
  const navigate = useNavigate();
  const place = value?.state?.location;

  const [weather, setWeather] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!place) return;
    const fetchWeather = async () => {
      try {
        const result = await getWeather(place);
        setWeather(result);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };
    fetchWeather();
  }, [place]);

  const formattedDate = currentTime.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const Rain = [
    "drizzle",
    "rain",
    "freezing_rain",
    "thunderstorm",
    "heavy_rain",
    "light_rain",
  ];

  function getRecommandations(weather) {
    if (!weather || !weather.condition) return null;
    const condition = weather.condition.toLowerCase();

    if (condition.includes("snow"))
      return {
        label: "Snow Alert",
        text: "It's snowing. Wear warm clothes and take it slow outside.",
      };
    if (
      Rain.includes(condition) ||
      condition.includes("rain") ||
      condition.includes("thunderstorm")
    )
      return {
        label: "Rain Alert",
        text: "It's raining or storming outside! Don't forget to take an umbrella and stay safe.",
      };
    if (condition.includes("fog"))
      return {
        label: "Fog Alert",
        text: "It's foggy. Drive carefully and keep some distance from other vehicles.",
      };
    if (weather.temperature >= 32)
      return {
        label: "Hot Day",
        text: "It's quite hot today. Take a water bottle with you.",
      };
    if (weather.temperature <= 15)
      return {
        label: "Cold Day",
        text: "It's cold today. Wear warm clothes before heading out.",
      };
    if (weather.temperature >= 28)
      return {
        label: "Warm Day",
        text: "It's warm today. Take some water with you.",
      };
    if (condition === "clear")
      return {
        label: "Sunny Day",
        text: "Sunny skies ahead. Take water and consider carrying sunglasses.",
      };
    if (
      condition === "partly_cloudy" ||
      condition === "cloudy" ||
      condition.includes("cloud")
    )
      return {
        label: "Cloudy Day",
        text: "Mostly cloudy today. A light jacket might come in handy.",
      };
    return {
      label: "Perfect Day",
      text: "The weather looks comfortable today. Enjoy your day!",
    };
  }

  const recommendation = getRecommandations(weather);

  const iconColor = "text-blue-500";

  return (
    <div className="relative min-h-screen w-full px-3 xs:px-4 sm:px-6 lg:px-10 py-5 sm:py-8 lg:py-10 text-white">
      <div className="max-w-7xl mx-auto">
        {/* ===== Header ===== */}
        <div className="flex items-center justify-between gap-3 mb-5 sm:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] hover:border-purple-300/30 transition-all duration-300 active:scale-[0.96]"
          >
            <ArrowLeft
              className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor} transition-transform duration-300 group-hover:-translate-x-1 shrink-0`}
              strokeWidth={2}
            />
            <span className="text-xs sm:text-sm font-medium text-white/75 group-hover:text-white transition-colors duration-300">
              Back
            </span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
            <span className="text-[9px] sm:text-[10px] font-semibold text-white/45 uppercase tracking-[0.15em]">
              Live
            </span>
          </div>
        </div>

        {/* ===== Grid ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 lg:space-y-6">
            {/* ===== Main Weather Card ===== */}
            <div className="relative bg-gradient-to-br from-[#2f2942] to-[#241f36] border border-white/[0.08] rounded-2xl sm:rounded-[28px] p-4 xs:p-5 sm:p-6 lg:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden">
              <div className="absolute top-0 left-8 right-8 sm:left-12 sm:right-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* Title */}
              <div className="relative flex items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
                <span className="w-1 h-5 sm:h-6 bg-blue-400 rounded-full shrink-0" />
                <h1 className="text-xl xs:text-lg sm:text-xl lg:text-2xl font-semibold text-blue-300 tracking-tight">
                  Today's Weather Details
                </h1>
              </div>

              {/* Location */}
              <div className="relative flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 min-w-0">
                <MapPin
                  className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${iconColor} shrink-0`}
                  strokeWidth={1.8}
                />
                <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-white tracking-tight truncate">
                  {place?.name || "Unknown Location"}
                </h2>
              </div>

              {/* Temperature */}
              <div className="relative flex flex-wrap items-end gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2 mb-5 sm:mb-7 pb-4 sm:pb-6 border-b border-white/[0.08]">
                <div className="flex items-start">
                  <span className="text-5xl xs:text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-none">
                    {weather?.temperature ?? "--"}
                  </span>
                  <span className="text-2xl xs:text-2xl sm:text-3xl font-bold text-blue-300 mt-1.5 sm:mt-2 ml-1">
                    °C
                  </span>
                </div>
                <div className="pb-1 sm:pb-2">
                  <p className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-300 capitalize">
                    {weather?.description || "Loading..."}
                  </p>
                </div>
              </div>

              {/* Metrics — 3 columns on mobile (compact) */}
              <div className="relative grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
                {/* Feels Like */}
                <div className="flex flex-col items-center justify-center text-center bg-white/[0.05] border border-white/[0.08] rounded-xl sm:rounded-2xl p-3 sm:p-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-purple-300/25">
                  <Thermometer
                    className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${iconColor} mb-2 sm:mb-3`}
                    strokeWidth={1.8}
                  />
                  <h3 className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold text-white/50 uppercase tracking-[0.1em] sm:tracking-[0.12em] mb-1 sm:mb-1.5">
                    Feels Like
                  </h3>
                  <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                    {weather?.feelsLike ?? "--"}°
                  </p>
                </div>

                {/* Humidity */}
                <div className="flex flex-col items-center justify-center text-center bg-white/[0.05] border border-white/[0.08] rounded-xl sm:rounded-2xl p-3 sm:p-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-purple-300/25">
                  <Droplets
                    className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${iconColor} mb-2 sm:mb-3`}
                    strokeWidth={1.8}
                  />
                  <h3 className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold text-white/50 uppercase tracking-[0.1em] sm:tracking-[0.12em] mb-1 sm:mb-1.5">
                    Humidity
                  </h3>
                  <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                    {weather?.humidity ?? "--"}
                    <span className="text-xs sm:text-sm font-normal text-purple-300/70 align-top ml-0.5">
                      %
                    </span>
                  </p>
                </div>

                {/* Wind */}
                <div className="flex flex-col items-center justify-center text-center bg-white/[0.05] border border-white/[0.08] rounded-xl sm:rounded-2xl p-3 sm:p-5 transition-all duration-300 hover:bg-white/[0.08] hover:border-purple-300/25">
                  <Wind
                    className={`w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${iconColor} mb-2 sm:mb-3`}
                    strokeWidth={1.8}
                  />
                  <h3 className="text-[9px] xs:text-[10px] sm:text-[11px] font-semibold text-white/50 uppercase tracking-[0.1em] sm:tracking-[0.12em] mb-1 sm:mb-1.5">
                    Wind
                  </h3>
                  <p className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-white">
                    {weather?.windSpeed ?? "--"}
                    <span className="text-[10px] xs:text-xs font-normal text-purple-300/70 ml-0.5 sm:ml-1">
                      km/h
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* ===== Smart Recommendation ===== */}
            <div className="relative bg-gradient-to-br from-[#2f2942] to-[#241f36] border border-white/[0.08] rounded-2xl sm:rounded-[28px] p-4 xs:p-5 sm:p-6 lg:p-7 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] overflow-hidden">
              <div className="absolute top-0 left-8 right-8 sm:left-12 sm:right-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <div className="absolute left-0 top-8 bottom-8 sm:top-10 sm:bottom-10 w-[3px] bg-gradient-to-b from-blue-400/60 via-purple-400/50 to-cyan-400/60 rounded-r-full" />

              <div className="relative flex items-center gap-2.5 sm:gap-3 mb-3.5 sm:mb-5 pl-2.5 sm:pl-3">
                <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-purple-400/[0.1] border border-purple-400/20 shrink-0">
                  <Sparkles
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${iconColor}`}
                    strokeWidth={1.8}
                  />
                </div>
                <h2 className="text-xs sm:text-sm lg:text-base font-extrabold text-blue-400 tracking-[0.10em] sm:tracking-[0.15em] uppercase">
                  Smart Recommendations
                </h2>
              </div>

              {recommendation ? (
                <div className="relative space-y-3 sm:space-y-4 pl-2.5 sm:pl-3">
                  <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 bg-purple-400/[0.1] border border-purple-400/25 text-purple-100 text-[9px] sm:text-[10px] lg:text-[11px] font-bold rounded-full uppercase tracking-[0.12em] sm:tracking-[0.15em]">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-300" />
                    {recommendation.label}
                  </span>

                  <p className="text-sm sm:text-base lg:text-lg text-white/85 leading-relaxed font-normal">
                    {recommendation.text}
                  </p>
                </div>
              ) : (
                <div className="relative flex items-center gap-2.5 sm:gap-3 pl-2.5 sm:pl-3">
                  <div className="w-3.5 h-3.5 border-2 border-purple-400/25 border-t-purple-300/80 rounded-full animate-spin shrink-0" />
                  <p className="text-white/50 text-xs sm:text-sm">
                    Analyzing weather data...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="lg:col-span-5">
            <div className="relative h-full bg-gradient-to-br from-[#2f2942] to-[#241f36] border border-white/[0.08] rounded-2xl sm:rounded-[28px] p-4 xs:p-5 sm:p-6 lg:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col gap-5 sm:gap-6 lg:gap-8 overflow-hidden">
              <div className="absolute top-0 left-8 right-8 sm:left-12 sm:right-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {/* ===== Live Time & Date ===== */}
              <div className="relative">
                <div className="relative bg-white/[0.05] border border-white/[0.08] rounded-xl sm:rounded-2xl p-4 sm:p-5">
                  <div className="relative flex items-center justify-center gap-2 mb-3.5 sm:mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70" />
                    <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/50">
                      Live Time & Date
                    </p>
                  </div>

                  <div className="relative space-y-3 sm:space-y-4">
                    {/* Date */}
                    <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                      <Calendar
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor} shrink-0`}
                        strokeWidth={1.8}
                      />
                      <span className="text-xs sm:text-sm font-medium text-white/90 whitespace-nowrap tracking-wide">
                        {formattedDate}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-400/25" />
                      <span className="w-1 h-1 rounded-full bg-purple-400/50" />
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-400/25" />
                    </div>

                    {/* Time — FIXED WIDTH */}
                    <div className="flex items-center justify-center gap-2.5 sm:gap-3">
                      <Clock
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor} shrink-0`}
                        strokeWidth={1.8}
                      />
                      <span className="inline-block w-[110px] xs:w-[118px] sm:w-[130px] text-center text-base sm:text-lg font-bold text-white tabular-nums whitespace-nowrap tracking-wider">
                        {formattedTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ===== Status Visual ===== */}
              <div className="relative flex-1 flex flex-col items-center justify-center text-center gap-4 sm:gap-5 py-3 sm:py-4">
                <div className="relative w-20 h-20 xs:w-24 xs:h-24 sm:w-28 sm:h-28 rounded-full bg-white/[0.05] border border-purple-400/20 flex items-center justify-center">
                  <CloudSun
                    className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 ${iconColor}`}
                    strokeWidth={1.3}
                  />
                </div>

                <div className="space-y-1 sm:space-y-1.5 px-2">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-purple-200/60 uppercase tracking-[0.18em] sm:tracking-[0.2em]">
                    Current Status
                  </span>
                  <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    Live in {place?.name || "Location"}
                  </h2>
                </div>

                <div className="px-4 sm:px-6 py-2 sm:py-2.5 border-purple-400/20 max-w-full">
                  <p className="text-base xs:text-lg sm:text-xl lg:text-2xl font-semibold text-blue-300 capitalize tracking-tight truncate">
                    {weather?.description || "Loading..."}
                  </p>
                </div>
              </div>

              {/* ===== Thermal Sensation ===== */}
              <div className="relative pt-4 sm:pt-5 border-t border-white/[0.08]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-white/50 uppercase tracking-[0.18em] sm:tracking-[0.2em]">
                    Thermal Sensation
                  </span>
                  <span className="text-sm sm:text-base lg:text-lg font-semibold text-blue-300 gap-2">
                    Feel's Like:
                    <span> </span>
                    {weather?.feelsLike ?? "--"}°C
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
