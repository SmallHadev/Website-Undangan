import FloralCluster from "./FloralCluster";
import "./EventDetail.css";

function EventDetail() {
  return (
    <section className="event-section">
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

      {/* WAYANG KIRI (11.png) & KANAN (10.png) */}
      <div className="event-wayang event-wayang-left">
        <img src="/assets/11.png" alt="Wayang kiri" />
      </div>

      <div className="event-wayang event-wayang-right">
        <img src="/assets/10.png" alt="Wayang kanan" />
      </div>

      {/* FLORAL DI UJUNG KAKI FRAME YANG BERTUMPU */}
      <div className="event-overlap-floral">
        <FloralCluster variant="bottom" />
      </div>

      {/* FRAME GERBANG BAWAH (16.png ROTATE 180 - KAKI MENUMPUK KAKI) */}
      <div className="event-frame-bottom">
        <img src="/assets/16.png" alt="Ornamen bingkai gerbang bawah" />
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
    </section>
  );
}

export default EventDetail;