import React, { useEffect, useState } from "react";
import "./MessageConstellation.css";

export default function MessageConstellation({ message }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    if (!message) {
      setStars([]);
      return;
    }

    const newStars = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));

    setStars(newStars);
  }, [message]);

  return (
    <div className="constellation-container">
      {message && <div className="message-box">{message}</div>}

      {stars.map((s, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
