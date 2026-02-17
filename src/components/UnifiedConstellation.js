import React, { useRef, useEffect, useState } from "react";
import "./UnifiedConstellation.css";

export default function UnifiedConstellation({ onRegionHover, onRegionLeave }) {
  const containerRef = useRef(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Global 3D tilt effect
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * -12;

      containerRef.current.style.transform =
        `rotateX(${y}deg) rotateY(${x}deg)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Stable star positions
  const stars = [
    { x: 10, y: 20 }, { x: 20, y: 35 }, { x: 30, y: 25 },
    { x: 45, y: 40 }, { x: 60, y: 30 }, { x: 75, y: 45 },
    { x: 85, y: 25 }, { x: 50, y: 60 }, { x: 30, y: 70 },
    { x: 70, y: 75 }, { x: 90, y: 60 },
  ];

  // Lines connect sequentially
  const lines = stars.map((s, i) =>
    i < stars.length - 1
      ? { x1: s.x, y1: s.y, x2: stars[i + 1].x, y2: stars[i + 1].y }
      : null
  ).filter(Boolean);

  // Each region maps to a specific star index
  const regionStarMap = {
    Africa: 7,
    Europe: 2,
    Asia: 5,
    NorthAmerica: 1,
    SouthAmerica: 8,
    Oceania: 10,
  };

  // Invisible hit areas
  const regions = [
    { id: "Africa", cx: "30%", cy: "55%", r: "12%" },
    { id: "Europe", cx: "40%", cy: "30%", r: "10%" },
    { id: "Asia", cx: "60%", cy: "35%", r: "12%" },
    { id: "NorthAmerica", cx: "20%", cy: "35%", r: "12%" },
    { id: "SouthAmerica", cx: "25%", cy: "70%", r: "12%" },
    { id: "Oceania", cx: "75%", cy: "65%", r: "12%" },
  ];

  return (
    <div
      className={`constellation-wrapper ${hoveredRegion ? "region-active" : ""}`}
      ref={containerRef}
    >
      <svg className="constellation-svg" viewBox="0 0 100 100">

        {/* Lines */}
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            className="constellation-line"
          />
        ))}

        {/* Stars */}
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x}
            cy={s.y}
            r={hoveredRegion && regionStarMap[hoveredRegion] === i ? 3.5 : 2}
            className={
              hoveredRegion && regionStarMap[hoveredRegion] === i
                ? "constellation-star star-highlight"
                : "constellation-star"
            }
          />
        ))}

        {/* Halo around the active star */}
        {hoveredRegion && (
          <circle
            cx={stars[regionStarMap[hoveredRegion]].x}
            cy={stars[regionStarMap[hoveredRegion]].y}
            r="6"
            className="star-halo"
          />
        )}

        {/* Invisible hit areas */}
        {regions.map((r) => (
          <circle
            key={r.id}
            cx={r.cx}
            cy={r.cy}
            r={r.r}
            className="hover-region"
            onPointerEnter={() => {
              setHoveredRegion(r.id);
              onRegionHover(r.id);
            }}
            onPointerLeave={() => {
              setHoveredRegion(null);
              onRegionLeave();
            }}
          />
        ))}
      </svg>
    </div>
  );
}
