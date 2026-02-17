import React, { useRef, useEffect, useState } from "react";
import "./UnifiedConstellation.css";

export default function UnifiedConstellation({ onRegionHover, onRegionLeave }) {
  const containerRef = useRef(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Stronger 3D tilt effect
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40; // increased
      const y = (e.clientY / window.innerHeight - 0.5) * -40;

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

  // Node colors
  const regionColors = {
    Africa: "#ffcc66",
    Europe: "#66ccff",
    Asia: "#ff6699",
    NorthAmerica: "#99ff66",
    SouthAmerica: "#ff9966",
    Oceania: "#cc99ff",
  };

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
        {stars.map((s, i) => {
          const isActive = hoveredRegion && regionStarMap[hoveredRegion] === i;
          const regionForStar = Object.entries(regionStarMap).find(
            ([_, idx]) => idx === i
          );
          const color = regionForStar ? regionColors[regionForStar[0]] : "#ffffffaa";

          return (
            <circle
              key={i}
              cx={s.x}
              cy={s.y}
              r={isActive ? 4 : 2.5}
              className={isActive ? "constellation-star star-highlight" : "constellation-star"}
              style={{ fill: color }}
            />
          );
        })}

        {/* Halo around active star */}
        {hoveredRegion && (
          <circle
            cx={stars[regionStarMap[hoveredRegion]].x}
            cy={stars[regionStarMap[hoveredRegion]].y}
            r="7"
            className="star-halo"
            style={{
              transformOrigin: `${stars[regionStarMap[hoveredRegion]].x}% ${stars[regionStarMap[hoveredRegion]].y}%`
            }}
          />
        )}

        {/* Hit areas directly on stars */}
        {Object.entries(regionStarMap).map(([regionId, starIndex]) => (
          <circle
            key={`hit-${regionId}`}
            cx={stars[starIndex].x}
            cy={stars[starIndex].y}
            r="5"
            className="star-hit"
            onPointerEnter={() => {
              setHoveredRegion(regionId);
              onRegionHover(regionId);
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
