import BackgroundTemplate from "./BackgroundTemplate";
import CoupleSection from "./sections/CoupleSection";
import EventDetail from "./sections/EventDetail";
import GiftSection from "./sections/GiftSection"; // <--- Import GiftSection

function MainContent() {
  return (
    <BackgroundTemplate>
      <CoupleSection />
      <EventDetail />
      <GiftSection /> {/* <--- Pasang di sini */}
    </BackgroundTemplate>
  );
}

export default MainContent;