import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Cloud, Sun, CloudRain, MapPin, Clock } from 'lucide-react';

export default function LocalWeatherWidget() {
  const [time, setTime] = useState<string>('');
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);
  const [locationName, setLocationName] = useState<string>('Menyesuaikan...');
  const [loading, setLoading] = useState(true);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch weather
  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number, name: string) => {
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`);
        const data = await res.json();
        if (data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code
          });
          setLocationName(name);
        }
      } catch (e) {
        console.error("Failed to fetch weather", e);
      } finally {
        setLoading(false);
      }
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // If we have precise coords, we could reverse geocode, but for simplicity:
          fetchWeather(position.coords.latitude, position.coords.longitude, "Lokasi Anda");
        },
        (error) => {
          // Fallback to Jakarta
          fetchWeather(-6.2088, 106.8456, "Jakarta");
        },
        { timeout: 5000 }
      );
    } else {
      fetchWeather(-6.2088, 106.8456, "Jakarta");
    }
  }, []);

  const getWeatherIcon = (code: number) => {
    // WMO Weather interpretation codes (very simplified)
    if (code <= 3) return <Sun size={18} className="text-amber-500" />;
    if (code >= 51 && code <= 67) return <CloudRain size={18} className="text-blue-400" />;
    if (code >= 71) return <CloudRain size={18} className="text-indigo-300" />;
    return <Cloud size={18} className="text-slate-400" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="absolute right-6 top-32 z-20 hidden lg:flex flex-col bg-white/80 backdrop-blur-xl border border-slate-200/60 p-4 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] min-w-[160px]"
    >
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={14} className="text-[#4f46e5]" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">
          {locationName}
        </span>
      </div>
      
      <div className="flex items-center justify-between mb-1">
        <span className="text-2xl font-display font-medium tracking-tight text-slate-800">
          {time}
        </span>
        <Clock size={16} className="text-slate-300" />
      </div>

      <div className="h-px w-full bg-slate-100 my-2" />

      {loading ? (
        <div className="h-6 w-full animate-pulse bg-slate-100 rounded" />
      ) : weather ? (
        <div className="flex items-center gap-3">
          {getWeatherIcon(weather.code)}
          <span className="text-sm font-sans font-medium text-slate-600">
            {weather.temp}°C
          </span>
        </div>
      ) : null}
    </motion.div>
  );
}
