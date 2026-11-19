import { useState } from "react";
import InvitationCover from "./components/InvitationCover";
import LoadingScreen from "./components/LoadingScreen";
import OpeningScene from "./components/OpeningScene";
import CoupleSection from "./components/sections/CoupleSection";
import EventDetail from "./components/sections/EventDetail";
import GiftSection from "./components/sections/GiftSection";
import "./App.css";

function App() {
  const [stage, setStage] = useState("cover");
  // Tahapan: "cover" -> "loading" -> "opening" -> "loading-second" -> "main"

  return (
    <main className="opening">
      {/* 1. Halaman Depan */}
      {stage === "cover" && (
        <InvitationCover onOpen={() => setStage("loading")} />
      )}

      {/* 2. Layar Loading Pertama */}
      {stage === "loading" && (
        <LoadingScreen onComplete={() => setStage("opening")} />
      )}

      {/* 3. Scene Opening (Gunung & Rumah) */}
      {stage === "opening" && (
        <div className="opening-stage-wrap">
          <OpeningScene />
          <button
            type="button"
            className="opening-next-btn"
            onClick={() => setStage("loading-second")}
          >
            Buka Undangan
          </button>
        </div>
      )}

      {/* 4. Layar Loading Kedua */}
      {stage === "loading-second" && (
        <LoadingScreen onComplete={() => setStage("main")} />
      )}

      {/* 5. Alur Section Langsung (Tiap section atur background-nya sendiri) */}
      {stage === "main" && (
        <div className="sections-flow">
          <CoupleSection />
          <EventDetail />
          <GiftSection />
        </div>
      )}
    </main>
  );
}

export default App;