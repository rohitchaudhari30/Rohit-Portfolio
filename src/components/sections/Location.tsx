import { useState, useEffect } from "react";
import { MapPin, Globe, Navigation, Clock } from "lucide-react";
import { locationData } from "@/data/location";
import Container from "@/components/ui/Container";
import LinkButton from "@/components/ui/LinkButton";
import MapView from "./MapView";

export default function Location() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${locationData.lat},${locationData.lng}`;
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);
      setLocalTime(formatted);
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20">
      <Container>
        <div className="spotlight group relative overflow-hidden rounded-2xl border border-ink-border bg-ink-800 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Content Column */}
            <div className="relative z-10 flex flex-col justify-between gap-6 p-8 sm:p-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink-border bg-ink-900 text-signal shadow-sm">
                    <MapPin size={20} strokeWidth={1.8} />
                  </span>
                  <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Available for Remote & Hybrid
                  </div>
                </div>

                <div>
                  <p className="eyebrow mb-1">Based in</p>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-paper-100 sm:text-3xl">
                    {locationData.city}, {locationData.region}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-paper-400">
                    {locationData.lat}° N, {locationData.lng}° E
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-ink-border/50">
                  <div className="flex items-center gap-2.5 text-xs text-paper-300">
                    <Clock size={15} className="text-signal flex-shrink-0" />
                    <span className="font-mono text-paper-400">Local Time:</span>
                    <span className="font-mono font-semibold text-paper-100">{localTime || "IST (UTC+5:30)"}</span>
                  </div>

                  {locationData.remoteFriendly && (
                    <div className="flex items-center gap-2.5 text-xs text-paper-300">
                      <Globe size={15} className="text-signal flex-shrink-0" />
                      <span>{locationData.relocation || "Open to worldwide remote positions"}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <LinkButton href={directionsUrl} variant="primary" className="w-fit text-xs">
                  <Navigation size={14} /> Open in Google Maps
                </LinkButton>
              </div>
            </div>

            {/* Right Map Column */}
            <div className="relative h-80 w-full min-h-[320px] md:h-full">
              <MapView />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
