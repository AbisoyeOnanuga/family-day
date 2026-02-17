import React from "react";
import "./World.css";

export default function World({ onSelect }) {
  const regions = [
    { id: "Africa", coords: "M350 220 L380 260 L360 300 L330 260 Z" },
    { id: "Europe", coords: "M330 150 L360 170 L340 190 L310 170 Z" },
    { id: "Asia", coords: "M380 150 L450 180 L430 230 L360 200 Z" },
    { id: "NorthAmerica", coords: "M150 150 L200 180 L180 230 L120 200 Z" },
    { id: "SouthAmerica", coords: "M180 260 L210 300 L190 340 L160 300 Z" },
    { id: "Oceania", coords: "M480 260 L510 280 L490 310 L460 290 Z" },
  ];

  return (
    <div className="world-container">
      <svg viewBox="0 0 600 400" className="world-svg">
        {regions.map((r) => (
          <path
            key={r.id}
            d={r.coords}
            className="region"
            onMouseEnter={() => onSelect(r.id)}
            onMouseLeave={() => onSelect(null)}
          />
        ))}
      </svg>
    </div>
  );
}
