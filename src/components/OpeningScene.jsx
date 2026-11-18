import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./OpeningScene.css";

function OpeningScene() {
  const worldRef = useRef(null);
  const mountainRef = useRef(null);
  const houseRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kondisi awal
      gsap.set(worldRef.current, {
        scale: 1,
        opacity: 1,
      });

      gsap.set(mountainRef.current, {
        y: 0,
      });

      gsap.set(houseRef.current, {
        y: 0,
      });

      gsap.set(frameRef.current, {
        scale: 2.6,
        opacity: 1,
      });

      // Kondisi awal bunga & wayang
      gsap.set(".decor-item", {
        opacity: 0,
        scale: 0.75,
        y: 25,
      });

      // Kondisi awal teks tengah
      gsap.set(".wedding-title", {
        opacity: 0,
        y: 15,
        scale: 0.95,
      });

      // Urutan animasi
      const tl = gsap.timeline();

      // 1. Dunia pertama ditampilkan
      tl.to(
        {},
        {
          duration: 1.5,
        },
      );

      // 2. Kamera menjauh
      tl.to(worldRef.current, {
        scale: 0.72,
        duration: 3,
        ease: "power2.inOut",
      });

      // 3. Parallax gunung dan rumah
      tl.to(
        mountainRef.current,
        {
          y: -8,
          duration: 3,
          ease: "power2.inOut",
        },
        "<",
      );

      tl.to(
        houseRef.current,
        {
          y: 5,
          duration: 3,
          ease: "power2.inOut",
        },
        "<",
      );

      // 4. Frame dimensi kedua muncul
      tl.to(
        frameRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 3,
          ease: "power2.inOut",
        },
        "<",
      );

      // 5. Bunga & wayang muncul ("-=1" setelah animasi gerbang)
      tl.to(
        ".decor-item",
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=1",
      );

      // 6. Teks tengah muncul
      tl.to(
        ".wedding-title",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.6",
      );

      // 7. Animasi tanaman tertiup angin
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

      gsap.to(".bot-center-bigwhite", {
        y: -8,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

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
    <>
      {/* DIMENSI PERTAMA */}
      <div className="world" ref={worldRef}>
        <img
          ref={mountainRef}
          src="/assets/14.png"
          className="mountain"
          alt="Gunung"
        />

        <img
          ref={houseRef}
          src="/assets/15.png"
          className="house"
          alt="Rumah tradisional"
        />
      </div>

      {/* FRAME DIMENSI KEDUA */}
      <div className="frame-container" ref={frameRef}>
        <img src="/assets/16.png" className="frame" alt="Ornamen gerbang" />
      </div>

      {/* POJOK ATAS: Bunga putih besar (7.png) */}
      <div className="decor-wrap top-left z-8">
        <img
          src="/assets/7.png"
          className="decor-item sway-left origin-top-left"
          alt="Bunga putih atas kiri"
        />
      </div>
      <div className="decor-wrap top-right mirror z-8">
        <img
          src="/assets/7.png"
          className="decor-item sway-right origin-top-left"
          alt="Bunga putih atas kanan"
        />
      </div>

      {/* BAWAH LAPISAN 1: Rumput (4.png) */}
      <div className="decor-wrap bot-left-grass z-1">
        <img
          src="/assets/4.png"
          className="decor-item sway-left origin-bottom"
          alt="Rumput kiri"
        />
      </div>
      <div className="decor-wrap bot-right-grass mirror z-1">
        <img
          src="/assets/4.png"
          className="decor-item sway-right origin-bottom"
          alt="Rumput kanan"
        />
      </div>

      {/* BAWAH LAPISAN 2: Wayang (5.png) */}
      <div className="decor-wrap bot-left-wayang z-2">
        <img
          src="/assets/5.png"
          className="decor-item float-wayang"
          alt="Wayang kiri"
        />
      </div>
      <div className="decor-wrap bot-right-wayang mirror z-2">
        <img
          src="/assets/5.png"
          className="decor-item float-wayang"
          alt="Wayang kanan"
        />
      </div>

      {/* WAYANG PENGANTIN (Tepat di depan 5.png) */}
      <div className="decor-wrap bot-left-wayang-couple z-wayang-couple">
        <img
          src="/assets/11.png"
          className="decor-item float-wayang"
          alt="Wayang perempuan kiri"
        />
      </div>
      <div className="decor-wrap bot-right-wayang-couple z-wayang-couple">
        <img
          src="/assets/10.png"
          className="decor-item float-wayang"
          alt="Wayang laki-laki kanan"
        />
      </div>

      {/* BAWAH LAPISAN 3: Bunga putih (1.png) */}
      <div className="decor-wrap bot-left-white z-3">
        <img
          src="/assets/1.png"
          className="decor-item sway-left origin-bottom"
          alt="Bunga putih kiri"
        />
      </div>
      <div className="decor-wrap bot-right-white mirror z-3">
        <img
          src="/assets/1.png"
          className="decor-item sway-right origin-bottom"
          alt="Bunga putih kanan"
        />
      </div>

      {/* BAWAH LAPISAN 4: Belukar (6.png) */}
      <div className="decor-wrap bot-left-bush z-4">
        <img
          src="/assets/6.png"
          className="decor-item sway-left origin-bottom"
          alt="Belukar kiri"
        />
      </div>
      <div className="decor-wrap bot-right-bush mirror z-4">
        <img
          src="/assets/6.png"
          className="decor-item sway-right origin-bottom"
          alt="Belukar kanan"
        />
      </div>

      {/* BAWAH LAPISAN 5: Bunga putih, oren, dan daun (2.png) */}
      <div className="decor-wrap bot-left-orange z-5">
        <img
          src="/assets/2.png"
          className="decor-item sway-left origin-bottom"
          alt="Bunga putih oren kiri"
        />
      </div>
      <div className="decor-wrap bot-right-orange mirror z-5">
        <img
          src="/assets/2.png"
          className="decor-item sway-right origin-bottom"
          alt="Bunga putih oren kanan"
        />
      </div>

      {/* BAWAH LAPISAN 6: Bunga pink dan daun (3.png) */}
      <div className="decor-wrap bot-left-pink z-6">
        <img
          src="/assets/3.png"
          className="decor-item sway-left origin-bottom"
          alt="Bunga pink kiri"
        />
      </div>
      <div className="decor-wrap bot-right-pink mirror z-6">
        <img
          src="/assets/3.png"
          className="decor-item sway-right origin-bottom"
          alt="Bunga pink kanan"
        />
      </div>

      {/* BAWAH LAPISAN 7: Bunga pink besar (8.png) */}
      <div className="decor-wrap bot-left-bigpink z-7">
        <img
          src="/assets/8.png"
          className="decor-item sway-left origin-bottom-left"
          alt="Bunga pink besar kiri"
        />
      </div>
      <div className="decor-wrap bot-right-bigpink mirror z-7">
        <img
          src="/assets/8.png"
          className="decor-item sway-right origin-bottom-left"
          alt="Bunga pink besar kanan"
        />
      </div>

      {/* BAWAH LAPISAN 8: Bunga putih besar tengah (7.png) */}
      <div className="decor-wrap bot-center-bigwhite z-8">
        <img
          src="/assets/7.png"
          className="decor-item sway-center origin-bottom"
          alt="Bunga putih besar tengah"
        />
      </div>

      {/* TEKS TENGAH UNDANGAN */}
      <div className="wedding-title-wrap wedding-title">
        <p className="wedding-subtitle">The Wedding of</p>
        <h1 className="wedding-names">
          <span>Imam</span>
          <span className="wedding-amp">&amp;</span>
          <span>Ifa</span>
        </h1>
      </div>
    </>
  );
}

export default OpeningScene;