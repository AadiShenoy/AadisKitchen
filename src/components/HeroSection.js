import { Link } from "react-router-dom";
import CustomImage from "./CustomImage";

export default function HeroSection() {
  const images = [
    "https://aadishenoy.github.io/Food-JSON/gallery/img_1.jpg",
    "https://aadishenoy.github.io/Food-JSON/gallery/img_2.jpg",
    "https://aadishenoy.github.io/Food-JSON/gallery/img_3.jpg",
    "https://aadishenoy.github.io/Food-JSON/gallery/img_4.jpg",
    "https://aadishenoy.github.io/Food-JSON/gallery/img_5.jpg",
    "https://aadishenoy.github.io/Food-JSON/gallery/img_6.jpg",
    "https://aadishenoy.github.io/Food-JSON/gallery/img_7.jpg",
    "https://aadishenoy.github.io/Food-JSON/gallery/img_8.jpg",
    "https://aadishenoy.github.io/Food-JSON/gallery/img_9.jpg",
  ];
  return (
    <div className="section hero">
      <div className="col typography">
        <p className="info">
          Aadi's Kitchen is a place where you can please your soul and tummy
          with delicious food recepies of India.
        </p>
        <Link to="/recipes">
          <button className="btn">explore now</button>
        </Link>
      </div>
      <div className="col gallery">
        {images.map((src, index) => (
          <CustomImage key={index} imgSrc={src} pt={"90%"} />
        ))}
      </div>
    </div>
  );
}
