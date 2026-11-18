import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./LoadingScreen.css";

function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const leftDoorRef = useRef(null);
  const rightDoorRef = useRef(null);
  const wayangRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kondisi awal: pintu di luar layar (offside) & wayang tersembunyi
      gsap.set(leftDoorRef.current, { xPercent: -100 });
      gsap.set(rightDoorRef.current, { xPercent: 100 });
      gsap.set(wayangRef.current, { opacity: 0, scale: 0.85, y: 15 });

      const tl = gsap.timeline({
        onComplete: () => {
          // Beri tahu App.jsx bahwa animasi loading telah selesai
          if (onComplete) onComplete();
        },
      });

      // 1. Pintu kiri (20.png) dan kanan (21.png) menutup ke tengah bersamaan
      tl.to([leftDoorRef.current, rightDoorRef.current], {
        xPercent: 0,
        duration: 1.4,
        ease: "power3.inOut",
      });

      // 2. Wayang gunungan (5.png) muncul di tengah setelah pintu hampir tertutup
      tl.to(
        wayangRef.current,
        {
          opacity: 1,
          scale: 0.5,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.3"
      );

      // 3. Tahan sejenak sambil berdenyut halus (memberi kesan memuat)
      tl.to(wayangRef.current, {
        scale: 1,
        duration: 1.2,
        ease: "power2.inOut",
      });

      // 4. Transisi keluar (fade out) menuju OpeningScene
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="loading-screen" ref={containerRef}>
      {/* Layer 1: Pintu Kanan (21.png) */}
      <img
        ref={rightDoorRef}
        src="/assets/21.png"
        className="loading-door door-right"
        alt="Pintu kanan"
      />

      {/* Layer 2: Pintu Kiri (20.png) */}
      <img
        ref={leftDoorRef}
        src="/assets/20.png"
        className="loading-door door-left"
        alt="Pintu kiri"
      />

      {/* Layer 3: Wayang Gunungan Tengah (5.png) */}
      <img
        ref={wayangRef}
        src="/assets/5.png"
        className="loading-wayang"
        alt="Wayang gunungan"
      />
    </div>
  );
}

export default LoadingScreen;