import React from "react";
import "./Starfield.css";

export default function Starfield() {
  const stars = Array.from({ length: 80 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }));

  return (
    <div className="starfield">
      {stars.map((s, i) => (
        <div
          key={i}
          className="bg-star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
