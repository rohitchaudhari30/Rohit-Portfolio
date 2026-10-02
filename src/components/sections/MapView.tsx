import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme, themes } from "@/context/ThemeContext";
import { locationData } from "@/data/location";

// High-quality, industry-standard basemaps (100% free, zero watermarks)
const TILE_SOURCES = {
  dark: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
    attribution:
      '&copy; <a href="https://www.esri.com/" target="_blank" rel="noopener noreferrer">Esri</a> &mdash; Esri, DeLorme, NAVTEQ',
  },
  light: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
  },
} as const;

export default function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const { themeId } = useTheme();
  const [loaded, setLoaded] = useState(false);

  const activeTheme = themes.find((t) => t.id === themeId);
  const tileKind: keyof typeof TILE_SOURCES = activeTheme?.kind === "light" ? "light" : "dark";

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [locationData.lat, locationData.lng],
      zoom: 12,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    const tiles = L.tileLayer(TILE_SOURCES[tileKind].url, {
      attribution: TILE_SOURCES[tileKind].attribution,
      maxZoom: 18,
    }).addTo(map);
    tiles.once("load", () => setLoaded(true));
    tileLayerRef.current = tiles;

    const icon = L.divIcon({
      className: "",
      html: '<div class="pin-marker"><span class="pin-marker__ping"></span><span class="pin-marker__core"></span></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    L.marker([locationData.lat, locationData.lng], { icon })
      .addTo(map)
      .bindPopup(
        `<strong>${locationData.city}</strong><br/>${locationData.region}${
          locationData.remoteFriendly ? `<br/>${locationData.relocation}` : ""
        }`
      );

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (tileLayerRef.current) map.removeLayer(tileLayerRef.current);
    const tiles = L.tileLayer(TILE_SOURCES[tileKind].url, {
      attribution: TILE_SOURCES[tileKind].attribution,
      maxZoom: 18,
    }).addTo(map);
    tileLayerRef.current = tiles;
  }, [tileKind]);

  return (
    <div className="relative h-full w-full">
      {!loaded && (
        <div className="absolute inset-0 z-[1] flex items-center justify-center bg-ink-900">
          <span className="font-mono text-xs text-paper-500">Loading map…</span>
        </div>
      )}
      <div
        ref={containerRef}
        role="img"
        aria-label={`Map centered on ${locationData.city}, ${locationData.region}`}
        className="h-72 w-full md:h-full"
      />
      {/* Soft inner vignette so the map blends into the card instead of a hard tile edge */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ boxShadow: "inset 0 0 40px 6px rgb(var(--c-ink-950) / 0.35)" }}
        aria-hidden
      />
    </div>
  );
}
