import { useState } from "react";
import "./GiftSection.css";

function GiftSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");

  const handleCopy = async (text, type) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopiedText(type);
      setTimeout(() => {
        setCopiedText("");
      }, 2000);
    } catch {
      setCopiedText("");
    }
  };

  return (
    <section className="gift-section">
      <div className={`gift-card-wrap ${isOpen ? "open" : ""}`}>
        {/* Ikon Kado di Bagian Atas */}
        <div className="gift-icon-header">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 12 20 22 4 22 4 12" />
            <rect x="2" y="7" width="20" height="5" />
            <line x1="12" y1="22" x2="12" y2="7" />
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
          </svg>
        </div>

        {/* KONDISI 1: BELUM DIBUKA */}
        {!isOpen && (
          <div className="gift-collapsed-content">
            <button
              type="button"
              className="gift-toggle-btn"
              onClick={() => setIsOpen(true)}
            >
              Kirim Hadiah
            </button>
          </div>
        )}

        {/* KONDISI 2: SUDAH DIBUKA */}
        {isOpen && (
          <div className="gift-expanded-content">
            <h2 className="gift-title">Wedding Gift</h2>
            <p className="gift-subtitle">With all our hearts</p>

            {/* Rekening 1 */}
            <div className="bank-card">
              <div className="bank-header">
                <div className="bca-logo">
                  <span className="bca-blue">BCA</span>
                </div>
              </div>
              <p className="account-name">Achmad Imam Thohari</p>
              <p className="account-number">05845616</p>
              <button
                type="button"
                className="copy-btn"
                onClick={() => handleCopy("05845616", "rek1")}
              >
                {copiedText === "rek1" ? "Berhasil Disalin!" : "Salin"}
              </button>
            </div>

            {/* Rekening 2 */}
            <div className="bank-card">
              <div className="bank-header">
                <div className="bca-logo">
                  <span className="bca-blue">BCA</span>
                </div>
              </div>
              <p className="account-name">Jelita Ifadatus Sholikhah</p>
              <p className="account-number">05845616</p>
              <button
                type="button"
                className="copy-btn"
                onClick={() => handleCopy("05845616", "rek2")}
              >
                {copiedText === "rek2" ? "Berhasil Disalin!" : "Salin"}
              </button>
            </div>

            <p className="gift-address-title">Send gifts to the address listed</p>

            {/* Kotak Alamat Kirim Kado */}
            <div className="bank-card address-card">
              <p className="gift-address-text">
                Jalan Nginden IIID no.38, Nginden Jangkungan, Sukolilo, Surabaya
                <br />
                Atas Nama : Achmad Thoricul Hadi / Achmad Imam Thohari
              </p>
              <button
                type="button"
                className="copy-btn address-copy-btn"
                onClick={() =>
                  handleCopy(
                    "Jalan Nginden IIID no.38, Nginden Jangkungan, Sukolilo, Surabaya (Atas Nama : Achmad Thoricul Hadi / Achmad Imam Thohari)",
                    "alamat"
                  )
                }
              >
                {copiedText === "alamat" ? "Berhasil Disalin!" : "Salin"}
              </button>
            </div>

            {/* Tombol Minimize */}
            <button
              type="button"
              className="gift-toggle-btn minimize-btn"
              onClick={() => setIsOpen(false)}
            >
              Minimize
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default GiftSection;