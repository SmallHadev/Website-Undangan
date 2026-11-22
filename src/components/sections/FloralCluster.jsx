import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./FloralCluster.css";

function FloralCluster({ variant = "bottom", className = "" }) {
  const clusterRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animasi masuk sekali saat pertama kali masuk area scroll
  useEffect(() => {
    const el = clusterRef.current;
    if (!el || isVisible) return;

    const scrollContainer = el.closest(".opening");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        root: scrollContainer || null,
        threshold: 0.1,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  // Animasi goyangan & float berkelanjutan pada gambar bunga
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".fc-sway-left", {
        rotation: 2.4,
        x: 2,
        duration: 2.9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".fc-sway-right", {
        rotation: -2.4,
        x: -2,
        duration: 3.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".fc-float-center", {
        y: -7,
        scale: 1.02,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, clusterRef);

    return () => ctx.revert();
  }, []);

  const showTop = variant === "top" || variant === "full";
  const showBottom = variant === "bottom" || variant === "full";

  return (
    <div
      ref={clusterRef}
      className={`floral-cluster floral-variant-${variant} ${
        isVisible ? "is-floral-visible" : ""
      } ${className}`}
      aria-hidden="true"
    >
      {showTop && (
        <>
          {/* BUNGA ATAS KIRI & KANAN (8.png) */}
          <div className="fc-item fc-top-left">
            <img
              src="/assets/8.png"
              className="fc-sway-left fc-origin-top-left"
              alt=""
            />
          </div>
          <div className="fc-item fc-top-right">
            <img
              src="/assets/8.png"
              className="fc-sway-right fc-origin-top-left"
              alt=""
            />
          </div>
        </>
      )}

      {showBottom && (
        <>
          {/* SISI KIRI: 1.png, 2.png, 3.png, 4.png, 2hijau.png */}
          <div className="fc-item fc-left fc-l4">
            <img
              src="/assets/4.png"
              className="fc-sway-left fc-origin-bottom"
              alt=""
            />
          </div>
          <div className="fc-item fc-left fc-l1">
            <img
              src="/assets/1.png"
              className="fc-sway-left fc-origin-bottom"
              alt=""
            />
          </div>
          <div className="fc-item fc-left fc-l2">
            <img
              src="/assets/2.png"
              className="fc-sway-left fc-origin-bottom"
              alt=""
            />
          </div>
          <div className="fc-item fc-left fc-l3">
            <img
              src="/assets/3.png"
              className="fc-sway-left fc-origin-bottom"
              alt=""
            />
          </div>
          <div className="fc-item fc-l5">
            <img
              src="/assets/2hijau.png"
              className="fc-sway-left fc-origin-bottom"
              alt=""
            />
          </div>

          {/* SISI KANAN (MIRROR): 1.png, 2.png, 3.png, 4.png */}
          <div className="fc-item fc-right fc-r4">
            <img
              src="/assets/4.png"
              className="fc-sway-right fc-origin-bottom"
              alt=""
            />
          </div>
          <div className="fc-item fc-right fc-r1">
            <img
              src="/assets/1.png"
              className="fc-sway-right fc-origin-bottom"
              alt=""
            />
          </div>
          <div className="fc-item fc-right fc-r2">
            <img
              src="/assets/2.png"
              className="fc-sway-right fc-origin-bottom"
              alt=""
            />
          </div>
          <div className="fc-item fc-right fc-r3">
            <img
              src="/assets/3.png"
              className="fc-sway-right fc-origin-bottom"
              alt=""
            />
          </div>

          {/* 8kuning.png SEDIKIT KELUAR DARI SUMBU X KIRI & KANAN */}
          <div className="fc-item fc-yellow-left">
            <img
              src="/assets/8kuning.png"
              className="fc-sway-left fc-origin-bottom"
              alt=""
            />
          </div>
          <div className="fc-item fc-yellow-right">
            <img
              src="/assets/8kuning.png"
              className="fc-sway-right fc-origin-bottom"
              alt=""
            />
          </div>
          <div className="fc-item fc-r5">
            <img
              src="/assets/2hijau.png"
              className="fc-sway-right fc-origin-bottom"
              alt=""
            />
          </div>

          {/* TENGAH BAWAH: 2hijau.png */}
          <div className="fc-item fc-center-8">
            <img
              src="/assets/2hijau.png"
              className="fc-float-center fc-origin-bottom"
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
}

export default FloralCluster;