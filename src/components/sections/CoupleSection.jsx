import BackgroundTemplate from "../BackgroundTemplate";
import "./CoupleSection.css";

function CoupleSection() {
  return (
    <BackgroundTemplate>
      <section className="couple-section">
        <div className="couple-frame-wrap">
          <img
            src="/assets/23.png"
            className="couple-bg-frame"
            alt="Bingkai Merah"
          />

          <div className="couple-text-content">
            <p className="couple-intro">
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan
            </p>

            <div className="person-block">
              <h2 className="person-name">Achmad Imam Thohari</h2>
              <p className="parent-info">
                Putra Bapak Waris Santoso &amp; Ibu Mudjiati
              </p>
            </div>

            <div className="couple-ampersand">&amp;</div>

            <div className="person-block">
              <h2 className="person-name">Jelita Ifadatus Sholikhah</h2>
              <p className="parent-info">
                Putri Bapak Waris Santoso &amp; Ibu Mudjiati
              </p>
            </div>

            <p className="couple-duo-prayer">
              Semoga menjadi keluarga
              <br />
              <span>Sakinah, Mawaddah, Warahmah</span>
            </p>
          </div>
        </div>
      </section>
    </BackgroundTemplate>
  );
}

export default CoupleSection;