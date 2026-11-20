import { useEffect, useState } from "react";
import InvitationCover from "./components/InvitationCover";
import LoadingScreen from "./components/LoadingScreen";
import OpeningScene from "./components/OpeningScene";
import BackgroundTemplate from "./components/BackgroundTemplate";
import CoupleSection from "./components/sections/CoupleSection";
import EventDetail from "./components/sections/EventDetail";
import GiftSection from "./components/sections/GiftSection";
import "./App.css";

function App() {
  const [stage, setStage] = useState("cover");
  // Tahapan: "cover" -> "loading" -> "opening" -> "loading-second" -> "main"

  const isOpeningMounted = stage === "loading" || stage === "opening";

  useEffect(() => {
    if (stage === "main") {
      window.scrollTo(0, 0);
      const openingEl = document.querySelector(".opening");
      if (openingEl) openingEl.scrollTop = 0;
    }
  }, [stage]);

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

      {/* 3. Scene Opening */}
      {isOpeningMounted && (
        <div
          className="opening-stage-wrap"
          style={{
            visibility: stage === "opening" ? "visible" : "hidden",
            pointerEvents: stage === "opening" ? "auto" : "none",
          }}
        >
          <OpeningScene
            isActive={stage === "opening"}
            onComplete={() => setStage("loading-second")}
          />
        </div>
      )}

      {/* 4. Layar Loading Kedua */}
      {stage === "loading-second" && (
        <LoadingScreen onComplete={() => setStage("main")} />
      )}

      {/* 5. Alur Section Utama */}
      {stage === "main" && (
        <div className="sections-flow">
          {/* Latar belakang menyatu untuk CoupleSection & EventDetail */}
          <BackgroundTemplate>
            <CoupleSection />
            <EventDetail />
          </BackgroundTemplate>

          {/* Section dengan background merah mandiri */}
          <GiftSection />
        </div>
      )}
    </main>
  );
}

export default App;