import React, { useRef, useState, useEffect } from "react";
import "./ConstellationCluster.css";

export default function ConstellationCluster({
  id,
  centerX,
  centerY,
  onHover,
  onLeave,
}) {
  const [hovered, setHovered] = useState(false);
  const starsRef = useRef([]);

  // Generate stable star positions once
  if (starsRef.current.length === 0) {
    starsRef.current = Array.from({ length: 7 }, () => ({
      x: (Math.random() - 0.5) * 120,
      y: (Math.random() - 0.5) * 120,
    }));
  }

  const handleEnter = () => {
    setHovered(true);
    onHover(id);
  };

  const handleLeave = () => {
    setHovered(false);
    onLeave();
  };

  return (
    <div
      className="cluster"
      style={{ left: centerX, top: centerY }}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      <svg className="cluster-svg">
        {starsRef.current.map((s, i) => (
          <circle
            key={i}
            cx={s.x + 150}
            cy={s.y + 150}
            r={hovered ? 8 : 5}
            className={`star ${hovered ? "star-hover" : ""}`}
          />
        ))}

        {starsRef.current.map((s, i) =>
          i < starsRef.current.length - 1 ? (
            <line
              key={`line-${i}`}
              x1={s.x + 150}
              y1={s.y + 150}
              x2={starsRef.current[i + 1].x + 150}
              y2={starsRef.current[i + 1].y + 150}
              className={`line ${hovered ? "line-hover" : ""}`}
            />
          ) : null
        )}
      </svg>
    </div>
  );
}
