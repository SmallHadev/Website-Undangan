import { useEffect, useRef, useState } from "react";
import "./ThanksSection.css";

function ThanksSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
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
        rootMargin: "0px 0px -16% 0px",
        threshold: 0.2,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`thanks-section ${isVisible ? "is-thanks-visible" : ""}`}
    >
      {/* JUDUL PASANGAN & UCAPAN TERIMA KASIH */}
      <div className="thanks-header thanks-reveal">
        <h2 className="thanks-couple-names">Imam &amp; Ifa</h2>
        <p className="thanks-message">
          Atas kehadiran dan doa restunya
          <br />
          kami ucapkan terima kasih
        </p>
      </div>

      {/* FOTO 25.png + BUNGA DI BELAKANG / SEKITAR FOTO */}
      <div className="thanks-photo-stage thanks-reveal">
        {/* Bunga aksen di belakang kiri atas foto */}
        <img
          src="/assets/8kuning.png"
          alt=""
          aria-hidden="true"
          className="thanks-bg-floral thanks-floral-top-left"
        />

        {/* Bunga aksen di belakang kanan atas foto */}
        <img
          src="/assets/3.png"
          alt=""
          aria-hidden="true"
          className="thanks-bg-floral thanks-floral-top-right"
        />

        {/* Bunga aksen di belakang kiri bawah foto */}
        <img
          src="/assets/1.png"
          alt=""
          aria-hidden="true"
          className="thanks-bg-floral thanks-floral-bottom-left"
        />

        {/* Frame Foto Utama (25.png) */}
        <div className="thanks-photo-card">
          <img
            src="/assets/25.png"
            alt="Imam dan Ifa"
            className="thanks-photo-img"
          />
        </div>

        {/* Bunga aksen di depan/bawah kanan foto */}
        <img
          src="/assets/2.png"
          alt=""
          aria-hidden="true"
          className="thanks-bg-floral thanks-floral-bottom-right"
        />
      </div>

      {/* PENUTUP THANK YOU */}
      <div className="thanks-footer thanks-reveal">
        <p className="thanks-signoff">Thank you</p>
      </div>
    </section>
  );
}

export default ThanksSection;