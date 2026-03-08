"use client";
import Image from "next/image";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

export default function MapComponent({ center, zoom, markers }) {
  return (
    <MapContainer center={center} zoom={zoom} className="h-full w-full">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker) => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
          <Popup>
            <div className="text-black">
              <div className="relative mb-2 h-24 w-full overflow-hidden rounded">
                <Image
                  src={marker.image}
                  alt={marker.car}
                  fill
                  sizes="240px"
                  unoptimized
                  className="object-cover"
                />
              </div>
              <h4 className="font-bold">{marker.driver}</h4>
              <p>
                {marker.car} • {marker.comfort}
              </p>
              <p>
                ⭐ {marker.rating} • {marker.price}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
