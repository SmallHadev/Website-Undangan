import { useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import "./LocationRsvpSection.css";

const PAGE_SIZE = 3; // Jumlah ucapan yang tampil awal & setiap klik "Load More"

function LocationRsvpSection() {
  const sectionRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState("");

  const [wishes, setWishes] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingList, setLoadingList] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Ganti link ini dengan tautan Google Maps lokasi acara sebenarnya
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Nginden+II+D+No+38+Surabaya";

  // Animasi kedatangan saat di-scroll masuk ke area layar
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || isRevealed) return;

    const scrollContainer = el.closest(".opening");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.disconnect();
          }
        });
      },
      {
        root: scrollContainer || null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0.18,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isRevealed]);

  // Ambil data ucapan dari backend (dengan pagination untuk Load More)
  const fetchWishes = async (pageIndex = 0, reset = false) => {
    setLoadingList(true);
    const from = pageIndex * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("wishes")
      .select("id, name, message, attendance, created_at")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error && data) {
      setWishes((prev) => (reset ? data : [...prev, ...data]));
      setHasMore(data.length === PAGE_SIZE);
    }
    setLoadingList(false);
  };

  useEffect(() => {
    fetchWishes(0, true);
  }, []);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchWishes(nextPage, false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!name.trim() || !message.trim() || !attendance) {
      setFeedback("Mohon lengkapi nama, ucapan, dan konfirmasi kehadiran.");
      return;
    }

    setSubmitting(true);

    const { data, error } = await supabase
      .from("wishes")
      .insert([
        {
          name: name.trim(),
          message: message.trim(),
          attendance,
        },
      ])
      .select()
      .single();

    setSubmitting(false);

    if (error) {
      setFeedback("Gagal mengirim ucapan. Coba beberapa saat lagi.");
      return;
    }

    // Langsung tampilkan kiriman baru di urutan paling atas tanpa reload
    if (data) {
      setWishes((prev) => [data, ...prev]);
    }

    setName("");
    setMessage("");
    setAttendance("");
    setFeedback("Terima kasih atas ucapan dan doa restunya!");
  };

  return (
    <section
      ref={sectionRef}
      className={`loc-rsvp-section ${isRevealed ? "is-loc-rsvp-visible" : ""}`}
    >
      {/* ================= BAGIAN LOKASI ================= */}
      <div className="loc-header rsvp-reveal-item">
        <div className="loc-pin-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="38" height="38" fill="#ecdab9">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
        </div>

        <p className="loc-address-text">Nginden IID no 38 Surabaya</p>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="loc-btn"
        >
          Get Location
        </a>
      </div>

      {/* ================= BAGIAN UCAPAN & RSVP ================= */}
      <div className="rsvp-container">
        <div className="rsvp-heading-group rsvp-reveal-item">
          <h2 className="rsvp-title">Wishes</h2>
          <p className="rsvp-subtitle">Leave a prayer for us</p>
        </div>

        <form className="rsvp-form rsvp-reveal-item" onSubmit={handleSubmit}>
          <label className="rsvp-label" htmlFor="wish-name">
            Send a Wish:
          </label>

          <input
            id="wish-name"
            type="text"
            className="rsvp-input"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
          />

          <textarea
            className="rsvp-textarea"
            placeholder="Ucapan"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={400}
          />

          <select
            className="rsvp-select"
            value={attendance}
            onChange={(e) => setAttendance(e.target.value)}
          >
            <option value="" disabled>
              Konfirmasi kehadiran
            </option>
            <option value="Hadir">Hadir</option>
            <option value="Tidak Hadir">Tidak Hadir</option>
          </select>

          {feedback && <p className="rsvp-feedback">{feedback}</p>}

          <button type="submit" className="rsvp-submit-btn" disabled={submitting}>
            {submitting ? "Mengirim..." : "Submit"}
          </button>
        </form>

        {/* ================= DAFTAR UCAPAN (WISHLIST) ================= */}
        <div className="wishlist-wrapper rsvp-reveal-item">
          <p className="wishlist-heading">Whislist</p>

          <div className="wishlist-list">
            {wishes.length === 0 && !loadingList && (
              <p className="wishlist-empty">
                Belum ada ucapan. Jadilah yang pertama mengirim doa!
              </p>
            )}

            {wishes.map((item) => (
              <article key={item.id} className="wish-card">
                <div className="wish-card-header">
                  <span className="wish-author">{item.name}</span>
                  <span className="wish-sep">|</span>
                  <span
                    className={`wish-status ${
                      item.attendance === "Hadir" ? "is-hadir" : "is-tidak"
                    }`}
                  >
                    {item.attendance}
                  </span>
                </div>
                <p className="wish-body">{item.message}</p>
              </article>
            ))}
          </div>

          {hasMore && wishes.length > 0 && (
            <button
              type="button"
              className="load-more-btn"
              onClick={handleLoadMore}
              disabled={loadingList}
            >
              {loadingList ? "Memuat..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default LocationRsvpSection;