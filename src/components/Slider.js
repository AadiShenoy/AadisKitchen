import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import CustomImage from "./CustomImage";
import QouteSection from "./QuoteSection";
import { useSelector } from "react-redux";

export default function Slider() {
  const recipe = useSelector((state) => state.category.recipe)
  return (
    <div className="section hero">
      <div className="col">
        <AliceCarousel autoPlay autoPlayInterval="2000">
          {recipe.map((item,index) => {
            return <CustomImage imgSrc={item.image} pt="70%" key={index} />;
          })}
        </AliceCarousel>
      </div>
      <div className="col">
        <QouteSection />
      </div>
    </div>
  );
}
