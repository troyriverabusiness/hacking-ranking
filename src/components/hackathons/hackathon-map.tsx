"use client";

import type { LatLngExpression } from "leaflet";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import type { Hackathon } from "@/lib/mock-data";


const locationCoordinates: Record<string, LatLngExpression> = {
  London: [51.5072, -0.1276],
  Paris: [48.8566, 2.3522],
  Berlin: [52.52, 13.405],
  Munich: [48.1351, 11.582],
  Zurich: [47.3769, 8.5417],
};

const defaultCoordinate: LatLngExpression = [50.11, 8.68];
const offsetStep = 0.08;

export function HackathonMap({ hackathons }: { hackathons: Hackathon[] }) {
  const groupedByLocation = hackathons.reduce<Record<string, Hackathon[]>>(
    (acc, hackathon) => {
      const locationKey = hackathon.location;
      if (!acc[locationKey]) {
        acc[locationKey] = [];
      }
      acc[locationKey].push(hackathon);
      return acc;
    },
    {},
  );

  const markers = Object.entries(groupedByLocation).flatMap(
    ([location, locationHackathons]) => {
      const coordinate = locationCoordinates[location] ?? defaultCoordinate;
      const [baseLat, baseLng] = coordinate as [number, number];
      return locationHackathons.map((hackathon, index) => {
        const direction = index % 2 === 0 ? 1 : -1;
        return {
          id: hackathon.id,
          name: hackathon.name,
          location: hackathon.location,
          lat: baseLat + offsetStep * index,
          lng: baseLng + offsetStep * direction,
        };
      });
    },
  );

  return (
    <section className="w-full h-full">
      <MapContainer
        center={[50.2, 10.3]}
        zoom={4}
        minZoom={3}
        maxZoom={8}
        scrollWheelZoom
        className="h-full w-full"
        style={{ backgroundColor: "#cfe9f6" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        />
        {markers.map((marker) => (
          <CircleMarker
            key={marker.id}
            center={[marker.lat, marker.lng]}
            radius={6}
            pathOptions={{
              color: "#5C88F6",
              fillColor: "#83C3E6",
              fillOpacity: 0.6,
            }}
          >
            <Tooltip direction="top" offset={[0, -6]} opacity={1}>
              {marker.name} · {marker.location}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
      <ul className="sr-only">
        {hackathons.map((hackathon) => (
          <li key={hackathon.id}>
            {hackathon.name} in {hackathon.location}
          </li>
        ))}
      </ul>
    </section>
  );
}
