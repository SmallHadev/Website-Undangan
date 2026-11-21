import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./CoupleSection.css";

gsap.registerPlugin(ScrollTrigger);

function CoupleSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const openingContainer = document.querySelector(".opening");
    const isDesktopScrollContainer =
      openingContainer && window.innerWidth >= 600;

    const ctx = gsap.context(() => {
      gsap.set(".couple-frame-wrap", {
        opacity: 0,
        y: 26,
        scale: 0.97,
      });

      gsap.set(".couple-anim-item", {
        opacity: 0,
        y: 12,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          scroller: isDesktopScrollContainer ? openingContainer : undefined,
          start: "top 82%",
          once: true,
        },
      });

      tl.to(".couple-frame-wrap", {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
      }).to(
        ".couple-anim-item",
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.45"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="couple-section" ref={sectionRef}>
      <div className="couple-frame-wrap">
        <div className="couple-text-content">
          <p className="couple-intro couple-anim-item">
            Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan
          </p>

          <div className="person-block couple-anim-item">
            <h2 className="person-name">Achmad Imam Thohari</h2>
            <p className="child-order">Anak ke-4 dari</p>
            <p className="parent-info">
              Putra Bapak Waris Santoso &amp; Ibu Mudjiati
            </p>
          </div>

          <div className="couple-ampersand couple-anim-item">&amp;</div>

          <div className="person-block couple-anim-item">
            <h2 className="person-name">Jelita Ifadatus Sholikhah</h2>
            <p className="child-order">Anak ke-1 dari</p>
            <p className="parent-info">
              Putri Bapak Hendro Soerjono (Alm.) &amp; Ibu Sulchah
            </p>
          </div>

          <p className="couple-duo-prayer couple-anim-item">
            Semoga menjadi keluarga
            <br />
            <span>Sakinah, Mawaddah, Warahmah</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default CoupleSection;