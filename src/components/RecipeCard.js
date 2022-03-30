import { useEffect } from "react";
import CustomImage from "./CustomImage";
import Aos from "aos";
import "aos/dist/aos.css";
import veg from "../assets/veg.png";
import nonveg from "../assets/nonveg.png";
import { Link } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
export default function RecipeCard({ recipe }) {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  var date = new Date(Date.now());
  var result =
    date.getMonth() > 8
      ? date.getMonth() + 1
      : "0" +
        (date.getMonth() + 1) +
        "/" +
        (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
        "/" +
        date.getFullYear();

  var a = moment(result, "M/D/YYYY");
  var b = moment(recipe.date, "M/D/YYYY");
  var diffDays = a.diff(b, "days");
  console.log(parseInt(diffDays / 365));
  if (parseInt(diffDays / 365) > 0) {
    result = parseInt(diffDays / 365);
    if (result === 1) {
      result = result + " year ago";
    } else {
      result = result + " years ago";
    }
  } else if (parseInt(diffDays / 30) > 0) {
    result = parseInt(diffDays / 30);
    if (result === 1) {
      result = result + " month ago";
    } else {
      result = result + " months ago";
    }
  } else {
    result = diffDays;
    if (result === 0) {
      result = " Today";
    } else if (result === 1) {
      result = result + " day ago";
    } else {
      result = result + " days ago";
    }
  }

  return (
    <div className="recipe-card" data-aos="zoom-in" data-aos-offset="100">
      <CustomImage imgSrc={recipe.image} pt="75%" />
      <div className="recipe-card-info">
        <p className="recipe-title">{recipe.title}</p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <img
            className="category"
            src={recipe.category === "veg" ? veg : nonveg}
            alt=""
          />
          <p className="category-text">
            {recipe.category === "veg" ? "Veg" : "Non Veg"}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "0.5em",
          }}
        >
          <Link className="view-btn" to="/detail" state={{ recipe: recipe }}>
            VIEW RECIPE
          </Link>
          <p className="date"><FontAwesomeIcon icon={faClock} />{" " +result}</p>
        </div>
      </div>
    </div>
  );
}
