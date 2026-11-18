import { useState } from "react";
import InvitationCover from "./components/InvitationCover";
import LoadingScreen from "./components/LoadingScreen";
import OpeningScene from "./components/OpeningScene";
import MainContent from "./components/MainContent";
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
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <OpeningScene />
          {/* Tombol debug untuk lanjut ke loading kedua */}
          <button 
            onClick={() => setStage("loading-second")}
            style={{
              position: "absolute",
              bottom: "30px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 99,
              padding: "10px 24px",
              background: "#e3b23c",
              border: "1px solid #9c721c",
              borderRadius: "20px",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer"
            }}
          >
            Buka Undangan
          </button>
        </div>
      )}

      {/* 4. Layar Loading Kedua */}
      {stage === "loading-second" && (
        <LoadingScreen onComplete={() => setStage("main")} />
      )}

      {/* 5. Konten Utama Undangan (Bisa Di-scroll & Background Diam) */}
      {stage === "main" && <MainContent />}
    </main>
  );
}

export default App;