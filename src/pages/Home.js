import HeroSection from "../components/HeroSection";
import ChiefsSection from "../components/ChiefsSection";
import Slider from "../components/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
export default function Home({ count }) {
  return (
    <div>
      <HeroSection />
      <Slider />
      <ChiefsSection />
      <div
        style={{
          backgroundColor: "black",
          padding: "15px",
          borderRadius: "5px",
        }}
      >
        <h1 style={{ textAlign: "center", color: "white", fontSize: "25px" }}>
          Total Viewers{" "}
          <FontAwesomeIcon icon={faEye} style={{ fontSize: "22px" }} /> :{" "}
          {count}
        </h1>
      </div>
    </div>
  );
}
