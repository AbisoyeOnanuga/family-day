import React, { useState } from "react";
import UnifiedConstellation from "./components/UnifiedConstellation";
import Starfield from "./components/Starfield";
import "./App.css";

export default function App() {
  const [message, setMessage] = useState("");

  const messages = {
    Africa: "To my family in Africa — your strength and joy inspire me every day.",
    Europe: "To my family in Europe — thank you for your wisdom and grounding energy.",
    Asia: "To my family in Asia — your creativity and resilience light up my world.",
    NorthAmerica: "To my family in North America — your love keeps me steady.",
    SouthAmerica: "To my family in South America — your warmth and passion uplift me.",
    Oceania: "To my family in Oceania — your spirit and kindness travel far.",
  };

  return (
    <div className="app">
      <Starfield />

      <header className="header">
        <h1>🌍 With Love, Across the World</h1>
        <p>Hover over a region to reveal a message.</p>
      </header>
      
      <UnifiedConstellation
        onRegionHover={(id) => setMessage(messages[id])}
        onRegionLeave={() => setMessage("")}
      />

      {message && <div className="message-box">{message}</div>}
    </div>
  );
}
