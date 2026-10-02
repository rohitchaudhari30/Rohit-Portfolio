import { MapPin, Globe, Navigation } from "lucide-react";
import { locationData } from "@/data/location";
import Container from "@/components/ui/Container";
import LinkButton from "@/components/ui/LinkButton";
import MapView from "./MapView";

export default function Location() {
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${locationData.lat},${locationData.lng}`;

  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-ink-border bg-ink-800 shadow-card md:grid-cols-2">
          <div className="flex flex-col justify-center gap-5 bg-ink-800 p-8 sm:p-10">
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-signal/10 text-signal">
              <MapPin size={20} strokeWidth={1.8} />
            </span>

            <div>
              <p className="eyebrow mb-1.5">Based in</p>
              <h3 className="font-display text-2xl font-semibold text-paper-100">
                {locationData.city}, {locationData.region}
              </h3>
            </div>

            <div className="space-y-2">
              {locationData.remoteFriendly && (
                <p className="flex items-center gap-2 text-sm text-paper-400">
                  <Globe size={14} className="text-signal" />
                  {locationData.relocation || "Remote & Hybrid OK"}
                </p>
              )}
            </div>

            <LinkButton href={directionsUrl} variant="secondary" className="w-fit text-xs">
              <Navigation size={14} /> Get Directions
            </LinkButton>
          </div>

          <div className="h-72 w-full md:h-auto">
            <MapView />
          </div>
        </div>
      </Container>
    </section>
  );
}
