import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import QouteSection from "./QuoteSection";
export default function Slider() {
  const images = [
    "/img/gallery/img_1.jpg",
    "/img/gallery/img_2.jpg",
    "/img/gallery/img_3.jpg",
    "/img/gallery/img_4.jpg",
    "/img/gallery/img_5.jpg",
    "/img/gallery/img_6.jpg",
    "/img/gallery/img_7.jpg",
    "/img/gallery/img_8.jpg",
    "/img/gallery/img_9.jpg",
  ];
  return (
    <div className="section hero">
      <div className="col">
        <AliceCarousel autoPlay autoPlayInterval="2000">
          {images.map((item) => {
            return <img src={item} className="sliderimg" alt="" />;
          })}
        </AliceCarousel>
      </div>
      <div className="col">
        <QouteSection />
      </div>
    </div>
  );
}
