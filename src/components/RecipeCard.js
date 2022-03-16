import { useEffect } from "react";
import CustomImage from "./CustomImage";
import Aos from "aos";
import "aos/dist/aos.css";
import veg from "../assets/veg.png";
import nonveg from "../assets/nonveg.png";
import { Link } from "react-router-dom";
export default function RecipeCard({ recipe }) {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  return (
    <div className="recipe-card" data-aos="zoom-in" data-aos-offset="100">
      <CustomImage imgSrc={recipe.image} pt="75%" />
      <div className="recipe-card-info">
        <p className="recipe-title">{recipe.title}</p>
        <div style={{display:'flex',flexDirection:'row'}}>
        <img
          className="category"
          src={recipe.category === "veg" ? veg : nonveg}
          alt=""
        />
        <p className="category-text">{recipe.category==="veg"?"Veg":"Non Veg"}</p>
        </div>
        <Link className="view-btn" to='/detail' state={{recipe:recipe}}>
          VIEW RECIPE
        </Link>
      </div>
    </div>
  );
}
