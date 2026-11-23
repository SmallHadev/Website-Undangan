import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./OpeningScene.css";

function OpeningScene({ isActive = true, onComplete }) {
  const sceneRef = useRef(null);
  const worldRef = useRef(null);
  const mountainRef = useRef(null);
  const houseRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    document.body.classList.add("opening-no-scroll");
    document.documentElement.classList.add("opening-no-scroll");

    const ctx = gsap.context(() => {
      // Kondisi awal saat animasi opening dimulai
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

      // Kondisi awal teks judul & 2 bagian ayat
      gsap.set(".wedding-title", {
        opacity: 0,
        y: 15,
        scale: 0.95,
      });

      gsap.set([".ar-rum-part-1", ".ar-rum-part-2"], {
        opacity: 0,
        y: 14,
        scale: 0.97,
      });

      // Urutan animasi dimulai setelah loading complete
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Kamera menjauh
      tl.to(worldRef.current, {
        scale: 0.72,
        duration: 3,
        ease: "power2.inOut",
      });

      // 2. Parallax gunung dan rumah
      tl.to(
        mountainRef.current,
        {
          y: -8,
          duration: 3,
          ease: "power2.inOut",
        },
        "<"
      );

      tl.to(
        houseRef.current,
        {
          y: 5,
          duration: 3,
          ease: "power2.inOut",
        },
        "<"
      );

      // 3. Frame dimensi kedua muncul
      tl.to(
        frameRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 3,
          ease: "power2.inOut",
        },
        "<"
      );

      // 4. Bunga & wayang muncul
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
        "-=1"
      );

      // 5. Judul "The Wedding of Imam & Ifa" muncul
      tl.to(
        ".wedding-title",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
        },
        "-=0.6"
      );

      // 6. Judul menghilang setelah jeda baca
      tl.to(".wedding-title", {
        opacity: 0,
        y: -12,
        scale: 0.96,
        duration: 1.0,
        delay: 2.0,
        ease: "power2.inOut",
      });

      // 7. Muncul ke-1: Paragraf 1 muncul
      tl.to(
        ".ar-rum-part-1",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.2"
      );

      // Paragraf 1 menghilang setelah jeda baca
      tl.to(".ar-rum-part-1", {
        opacity: 0,
        y: -12,
        scale: 0.96,
        duration: 1.0,
        delay: 2.6,
        ease: "power2.inOut",
      });

      // 8. Muncul ke-2: Paragraf 2 + sumber ayat muncul menggantikan paragraf 1
      tl.to(
        ".ar-rum-part-2",
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.2"
      );

      // 9. Jeda baca paragraf 2 sebelum otomatis masuk ke loading kedua
      tl.to({}, { duration: 2.2 });

      // 10. Animasi tanaman tertiup angin & wayang
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
    }, sceneRef);

    return () => {
      ctx.revert();
      document.body.classList.remove("opening-no-scroll");
      document.documentElement.classList.remove("opening-no-scroll");
    };
  }, [isActive, onComplete]);

  return (
    <div ref={sceneRef} className="opening-scene-root">
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
      <div className="decor-wrap top-right z-8">
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
      <div className="wedding-title-wrap">
        <div className="wedding-title">
          <p className="wedding-subtitle">The Wedding of</p>
          <h1 className="wedding-names">
            <span>Imam</span>
            <span className="wedding-amp">&amp;</span>
            <span>Ifa</span>
          </h1>
        </div>

        {/* Muncul ke-1: Paragraf 1 */}
        <div className="ar-rum-wrap ar-rum-part-1">
          <p className="ar-rum-text">
            Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang.
          </p>
        </div>

        {/* Muncul ke-2: Paragraf 2 + Sumber */}
        <div className="ar-rum-wrap ar-rum-part-2">
          <p className="ar-rum-text">
            Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda
            (kebesaran Allah) bagi kaum yang berpikir.
          </p>
          <p className="ar-rum-source">QS. AR-RUM (30) : 21</p>
        </div>
      </div>
    </div>
  );
}

export default OpeningScene;