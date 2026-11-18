import { useEffect } from "react";
import { gsap } from "gsap";
import "./BackgroundTemplate.css";

function BackgroundTemplate({ children }) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animasi tanaman tertiup angin halus (kiri & kanan)
      gsap.to(".sway-left", {
        rotation: 2.5,
        x: 2,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".sway-right", {
        rotation: -2.5,
        x: -2,
        duration: 3.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animasi wayang mengapung tipis di bawah
      gsap.to(".float-wayang", {
        y: -8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-template-container">
      {/* ================= BACKGROUND TETAP (FIXED) ================= */}
      <div className="fixed-background">
        {/* Layer 1: Gambar 20 & 21 (Pola Ukiran Atas) */}
        <div className="bg-layer l-base">
          <img src="/assets/20.png" className="bg-img-cover" alt="Ukuran 20" />
          <img src="/assets/21.png" className="bg-img-cover" alt="Ukuran 21" />
        </div>

        {/* Layer 2: Gambar 15 (Pendopo/Rumah Bawah) */}
        <div className="bg-layer l-house">
          <img src="/assets/15.png" className="house-element" alt="Rumah tradisional" />
        </div>

        {/* Layer 3: Gambar 4 (Rumput) */}
        <div className="bg-layer l-ornament">
          <div className="decor-wrap bot-left-grass z-1">
            <img src="/assets/4.png" className="sway-left origin-bottom" alt="Rumput kiri" />
          </div>
          <div className="decor-wrap bot-right-grass mirror z-1">
            <img src="/assets/4.png" className="sway-right origin-bottom" alt="Rumput kanan" />
          </div>
        </div>

        {/* Layer 4: Gambar 1 (Bunga Putih) */}
        <div className="bg-layer l-ornament">
          <div className="decor-wrap bot-left-white z-3">
            <img src="/assets/1.png" className="sway-left origin-bottom" alt="Bunga putih kiri" />
          </div>
          <div className="decor-wrap bot-right-white mirror z-3">
            <img src="/assets/1.png" className="sway-right origin-bottom" alt="Bunga putih kanan" />
          </div>
        </div>

        {/* Layer 5: Gambar 8 (Bunga Pink Besar / Lily) */}
        <div className="bg-layer l-ornament">
          <div className="decor-wrap bot-left-bigpink z-7">
            <img src="/assets/8.png" className="sway-left origin-bottom-left" alt="Bunga besar kiri" />
          </div>
          <div className="decor-wrap bot-right-bigpink mirror z-7">
            <img src="/assets/8.png" className="sway-right origin-bottom-left" alt="Bunga besar kanan" />
          </div>
        </div>

        {/* Layer 6: Gambar 2 (Bunga Oren & Daun Tambahan) */}
        <div className="bg-layer l-ornament">
          <div className="decor-wrap mc-orange-l z-5">
            <img src="/assets/2.png" className="sway-left origin-bottom" alt="Daun oren kiri" />
          </div>
          <div className="decor-wrap mc-orange-r mirror z-5">
            <img src="/assets/2.png" className="sway-right origin-bottom" alt="Daun oren kanan" />
          </div>
        </div>

        {/* Layer 7: Gambar 11 (Kiri) & Gambar 10 (Kanan) Wayang */}
        <div className="bg-layer l-wayang">
          <div className="decor-wrap mc-wayang-l z-7">
            <img src="/assets/11.png" className="float-wayang" alt="Wayang kiri" />
          </div>
          <div className="decor-wrap mc-wayang-r z-7">
            <img src="/assets/10.png" className="float-wayang" alt="Wayang kanan" />
          </div>
        </div>

        {/* Layer 8: Background Putih Transparansi */}
        <div className="bg-layer l-overlay" />
      </div>

      <div className="bg-template-scroll-area">
        {children}
      </div>
    </div>
  );
}

export default BackgroundTemplate;