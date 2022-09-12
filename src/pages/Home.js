import HeroSection from "../components/HeroSection";
import ChiefsSection from "../components/ChiefsSection";
import Slider from "../components/Slider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { db } from "../firebase-config";
import { updateDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function Home() {
  let count = useSelector((state) => state.category.count);

  useEffect(() => {
    window.scrollTo(0, 0);
    sessionStorage.removeItem("recipeVisit");
    if (!localStorage.getItem("visited")) {
      if (count !== 0) {
        const updateCount = async () => {
          const countDoc = doc(db, "totalCount", "1");
          await updateDoc(countDoc, { count: count + 1 });
        };
        updateCount();
        localStorage.setItem("visited", "yes");
      }
    }
  }, [count]);

  return (
    <div>
      <HeroSection />
      <Slider />
      <ChiefsSection />
      <div className="total-view-container">
        <h1>
          Total Viewers <FontAwesomeIcon icon={faEye} className="eye-icon" /> :{" "}
          {count}
        </h1>
      </div>
    </div>
  );
}
