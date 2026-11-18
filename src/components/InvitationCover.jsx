import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./InvitationCover.css";

function InvitationCover({ onOpen }) {
  const coverRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi masuk lembut saat halaman pertama kali dibuka
      gsap.from(".inv-animate", {
        opacity: 0,
        y: 16,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });

      // Animasi gerak halus (seperti tertiup angin/ombak kecil) untuk seluruh grup gunungan
      gsap.to(".inv-gunungan-group", {
        rotation: 3,           // Miring tipis ke kanan-kiri (cukup 3 derajat saja)
        x: 4,                  // Bergeser horizontal tipis
        duration: 3.2,         // Durasi pelan
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "bottom center",
      });
    }, coverRef);

    return () => ctx.revert();
  }, []);

  const handleOpenClick = () => {
    // Efek keluar lembut sebelum masuk ke LoadingScreen
    gsap.to(coverRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        if (onOpen) onOpen();
      },
    });
  };

  return (
    <section className="invitation-cover" ref={coverRef}>
      {/* Index 1: Hiasan bawah tengah (22.png) */}
      <img
        src="/assets/22.png"
        className="inv-ornament-bottom"
        alt="Hiasan bawah"
      />

      {/* Index 2: Wayang bawah kiri (11.png) dan kanan (10.png) */}
      <img
        src="/assets/11.png"
        className="inv-wayang-bottom inv-wayang-left"
        alt="Wayang perempuan"
      />
      <img
        src="/assets/10.png"
        className="inv-wayang-bottom inv-wayang-right"
        alt="Wayang laki-laki"
      />

      {/* Index 3: Frame gerbang (16.png) */}
      <img
        src="/assets/16.png"
        className="inv-frame"
        alt="Frame gerbang"
      />

      {/* Index 4: 3 Gambar Wayang Gunungan berdekatan di tengah (5.png) */}
      <div className="inv-gunungan-group inv-animate">
        <img
          src="/assets/5.png"
          className="inv-gunungan gunungan-left"
          alt="Gunungan kiri"
        />
        <img
          src="/assets/5.png"
          className="inv-gunungan gunungan-center"
          alt="Gunungan tengah"
        />
        <img
          src="/assets/5.png"
          className="inv-gunungan gunungan-right"
          alt="Gunungan kanan"
        />
      </div>

      {/* Index 5: Background putih dengan transparansi */}
      <div className="inv-white-overlay" />

      {/* Index 6: Tulisan Pengantin */}
      <div className="inv-text-content inv-animate">
        <p className="inv-subtitle">THE WEDDING OF</p>
        <h1 className="inv-names">
          <span>Achmad Imam Thohari</span>
          <span className="inv-amp">&amp;</span>
          <span>Jelita Ifadatus Sholikhah</span>
        </h1>
      </div>

      {/* Index 7: Button Undangan */}
      <div className="inv-btn-wrap inv-animate">
        <button
          type="button"
          className="inv-open-btn"
          onClick={handleOpenClick}
        >
          Undangan
        </button>
      </div>
    </section>
  );
}

export default InvitationCover;