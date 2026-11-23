import { useEffect, useRef, useState } from "react";
import FloralCluster from "./FloralCluster";
import "./EventDetail.css";

function EventDetail() {
  const akadRef = useRef(null);
  const resepsiRef = useRef(null);

  const [akadVisible, setAkadVisible] = useState(false);
  const [resepsiVisible, setResepsiVisible] = useState(false);

  // Trigger saat scroll agak masuk ke blok Akad
  useEffect(() => {
    const el = akadRef.current;
    if (!el || akadVisible) return;

    const scrollContainer = el.closest(".opening");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAkadVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        root: scrollContainer || null,
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.2,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [akadVisible]);

  // Trigger saat scroll agak masuk ke blok Resepsi (frame bawah, wayang, & teks resepsi)
  useEffect(() => {
    const el = resepsiRef.current;
    if (!el || resepsiVisible) return;

    const scrollContainer = el.closest(".opening");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setResepsiVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        root: scrollContainer || null,
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.2,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [resepsiVisible]);

  return (
    <section className="event-section">
      {/* AREA AKAD + FRAME ATAS + RUMAH */}
      <div
        ref={akadRef}
        className={`event-trigger-akad ${akadVisible ? "is-akad-visible" : ""}`}
      >
        {/* FRAME GERBANG ATAS (16.png) */}
        <div className="event-frame">
          <img src="/assets/16.png" alt="Ornamen bingkai gerbang" />
        </div>

        {/* TEKS AKAD NIKAH */}
        <div className="event-text-content">
          <h2 className="event-title">Akad Nikah</h2>

          <div className="event-info-box">
            <p className="event-date">Minggu, ... 2026</p>
            <p className="event-time">Pukul 08.30 WIB - Selesai</p>

            <div className="event-divider" />

            <p className="event-location-name">
              Kediaman Mempelai Wanita
            </p>

            <p className="event-address">
              Jl. Contoh Alamat No. 123, RT 01/RW 02, Kota Asal
            </p>
          </div>
        </div>

        {/* RUMAH TRADISIONAL BAGIAN BAWAH (15.png) */}
        <div className="event-house">
          <img src="/assets/15.png" alt="Rumah tradisional" />
        </div>
      </div>

      {/* FLORAL DI UJUNG KAKI FRAME YANG BERTUMPU */}
      <div className="event-overlap-floral">
        <FloralCluster variant="bottom" />
      </div>

      {/* AREA RESEPSI + FRAME BAWAH + WAYANG */}
      <div
        ref={resepsiRef}
        className={`event-trigger-resepsi ${
          resepsiVisible ? "is-resepsi-visible" : ""
        }`}
      >
        {/* FRAME GERBANG BAWAH (16.png ROTATE 180 - KAKI MENUMPUK KAKI) */}
        <div className="event-frame-bottom">
          <img src="/assets/16.png" alt="Ornamen bingkai gerbang bawah" />
        </div>

        {/* WAYANG KIRI (11.png) & KANAN (10.png) */}
        <div className="event-wayang event-wayang-left">
          <img src="/assets/11.png" alt="Wayang kiri" />
        </div>

        <div className="event-wayang event-wayang-right">
          <img src="/assets/10.png" alt="Wayang kanan" />
        </div>

        {/* TEKS RESEPSI DI BAGIAN BAWAH */}
        <div className="event-text-content event-text-bottom">
          <h2 className="event-title">Resepsi</h2>

          <div className="event-info-box">
            <p className="event-date">Minggu, ... 2026</p>
            <p className="event-time">Pukul 10.30 WIB - Selesai</p>

            <div className="event-divider" />

            <p className="event-location-name">
              Kediaman Mempelai Wanita
            </p>

            <p className="event-address">
              Jl. Contoh Alamat No. 123, RT 01/RW 02, Kota Asal
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetail;