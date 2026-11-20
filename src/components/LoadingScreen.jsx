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
      // Kondisi awal: pintu di luar layar & wayang tersembunyi
      gsap.set(leftDoorRef.current, { xPercent: -100 });
      gsap.set(rightDoorRef.current, { xPercent: 100 });
      gsap.set(wayangRef.current, { opacity: 0, scale: 0.5, y: 15 });
      gsap.set(containerRef.current, { opacity: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Pintu kiri (20.png) dan kanan (21.png) MENUTUP ke tengah
      tl.to([leftDoorRef.current, rightDoorRef.current], {
        xPercent: 0,
        duration: 1.2,
        ease: "power3.inOut",
      });

      // 2. Wayang gunungan (5.png) muncul di tengah saat pintu menutup
      tl.to(
        wayangRef.current,
        {
          opacity: 1,
          scale: 0.85,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.25"
      );

      // 3. Denyut halus saat memuat
      tl.to(wayangRef.current, {
        scale: 1,
        duration: 0.9,
        ease: "sine.inOut",
      });

      // 4. Wayang menghilang sebelum pintu terbuka
      tl.to(wayangRef.current, {
        opacity: 0,
        scale: 0.75,
        duration: 0.35,
        ease: "power2.in",
      });

      // 5. Pintu MEMBUKA kembali ke kiri & kanan
      tl.to(
        leftDoorRef.current,
        {
          xPercent: -105,
          duration: 1.15,
          ease: "power3.inOut",
        },
        "-=0.1"
      );

      tl.to(
        rightDoorRef.current,
        {
          xPercent: 105,
          duration: 1.15,
          ease: "power3.inOut",
        },
        "<"
      );
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