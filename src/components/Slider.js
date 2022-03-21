import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import CustomImage from "./CustomImage";
import QouteSection from "./QuoteSection";
export default function Slider({ recipe }) {
  return (
    <div className="section hero">
      <div className="col">
        <AliceCarousel autoPlay autoPlayInterval="1500">
          {recipe.map((item) => {
            return <CustomImage  imgSrc={item.image} pt="70%"/>
          })}
        </AliceCarousel>
      </div>
      <div className="col">
        <QouteSection />
      </div>
    </div>
  );
}
