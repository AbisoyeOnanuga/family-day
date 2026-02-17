import React, { useRef, useEffect, useState } from "react";
import "./UnifiedConstellation.css";

export default function UnifiedConstellation({ onRegionHover, onRegionLeave }) {
  const wrapperRef = useRef(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    const handleMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!inside) {
        wrapper.style.transform = `rotateX(0deg) rotateY(0deg)`;
        return;
      }

      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      // spherical-like tilt
      const tiltX = relY * -35; // stronger
      const tiltY = relX * 35;

      wrapper.style.transform =
        `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const stars = [
    { x: 10, y: 20 }, { x: 20, y: 35 }, { x: 30, y: 25 },
    { x: 45, y: 40 }, { x: 60, y: 30 }, { x: 75, y: 45 },
    { x: 85, y: 25 }, { x: 50, y: 60 }, { x: 30, y: 70 },
    { x: 70, y: 75 }, { x: 90, y: 60 },
  ];

  const lines = stars.map((s, i) =>
    i < stars.length - 1
      ? { x1: s.x, y1: s.y, x2: stars[i + 1].x, y2: stars[i + 1].y }
      : null
  ).filter(Boolean);

  const regionStarMap = {
    Africa: 7,
    Europe: 2,
    Asia: 5,
    NorthAmerica: 1,
    SouthAmerica: 8,
    Oceania: 10,
  };

  const regionColors = {
    Africa: "#ffcc66",
    Europe: "#66ccff",
    Asia: "#ff6699",
    NorthAmerica: "#99ff66",
    SouthAmerica: "#ff9966",
    Oceania: "#cc99ff",
  };

  return (
    <div className="constellation-outer">
      <div
        className={`constellation-wrapper ${hoveredRegion ? "region-active" : ""}`}
        ref={wrapperRef}
      >
        <svg className="constellation-svg" viewBox="0 0 100 100">

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
    </div>
  );
}
