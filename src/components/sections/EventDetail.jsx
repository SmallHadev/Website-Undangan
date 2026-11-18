import "./EventDetail.css";

function EventDetail() {
  return (
    <section className="event-section">
      <h2 className="event-section-title">  </h2>

      <div className="event-cards-container">
        {/* KARTU 1: AKAD NIKAH */}
        <div className="event-card-wrap">
          <div className="event-card-content">
            <h3 className="event-title">Akad Nikah</h3>
            <div className="event-info-box">
              <p className="event-date">Minggu, ... 2026</p>
              <p className="event-time">Pukul 08.30 WIB - Selesai</p>
              <div className="event-divider" />
              <p className="event-location-name">Kediaman Mempelai Wanita</p>
              <p className="event-address">
                Jl. Contoh Alamat No. 123, RT 01/RW 02, Kota Asal
              </p>
            </div>
            <button className="map-btn" onClick={() => alert("Buka Google Maps")}>
              Google Maps
            </button>
          </div>
        </div>

        {/* KARTU 2: RESEPSI */}
        <div className="event-card-wrap">
          <div className="event-card-content">
            <h3 className="event-title">Resepsi</h3>
            <div className="event-info-box">
              <p className="event-date">Minggu, ... 2026</p>
              <p className="event-time">Pukul 10.30 WIB - Selesai</p>
              <div className="event-divider" />
              <p className="event-location-name">Gedung / Tempat Resepsi</p>
              <p className="event-address">
                Jl. Contoh Alamat No. 123, RT 01/RW 02, Kota Asal
              </p>
            </div>
            <button className="map-btn" onClick={() => alert("Buka Google Maps")}>
              Google Maps
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventDetail;