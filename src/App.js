import React, { useState } from "react";
import UnifiedConstellation from "./components/UnifiedConstellation";
import "./App.css";

export default function App() {
  const [message, setMessage] = useState("");

  const messages = {
    Africa: "Happy Lunar New Year to everyone in Africa. Even from far away, I feel connected to you. Wishing you a year of calm days, good health, and steady progress.",
    Europe: "To my family in Europe: Happy Lunar New Year. I hope this season brings you warmth, clarity, and moments that make you smile.",
    Asia: "To my family in Asia: Happy Lunar New Year. I’m thinking of you and wishing you a year that opens gently and grows stronger with time.",
    NorthAmerica: "To my family in North America: Happy Lunar New Year. May this year give you space to breathe, rest, and move forward with confidence.",
    SouthAmerica: "To my family in South America: Happy Lunar New Year. Sending you good energy, good food, and good company for the year ahead.",
    Oceania: "To my family in Oceania: Happy Lunar New Year. I hope the new year brings you peace, balance, and moments of joy that stay with you.",
  };  

  return (
    <div className="app">
      <h1 className="title">✨ With Love, Across the Stars</h1>

      <UnifiedConstellation
        onRegionHover={(id) => setMessage(messages[id])}
        onRegionLeave={() => setMessage("")}
      />

      {message && <div className="message-box">{message}</div>}
    </div>
  );
}
