import "./EventDetail.css";

function EventDetail() {
  return (
    <section className="event-section">
      {/* FRAME GERBANG UTAMA (16.png) */}
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

        <button
          type="button"
          className="map-btn"
          onClick={() => alert("Buka Google Maps")}
        >
          Google Maps
        </button>
      </div>

      {/* RUMAH TRADISIONAL BAGIAN BAWAH (15.png) */}
      <div className="event-house">
        <img src="/assets/15.png" alt="Rumah tradisional" />
      </div>
    </section>
  );
}

export default EventDetail;