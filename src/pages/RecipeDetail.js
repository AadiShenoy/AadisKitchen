import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

function RecipeDetail() {
  const location = useLocation();
  const { recipe } = location.state;
  return (
    <>
      <div style={{ backgroundColor: "#eff4f7", padding: "10px" }}>
        <h2>{recipe.title}</h2>
        <img
          src={recipe.image}
          style={{
            width: "250px",
            height: "250px",
            marginTop: "10px",
            borderRadius: "5px",
          }}
          alt="food"
        />
        <h3 style={{ marginTop: "10px" }}>Ingredients</h3>
        <p style={{ marginTop: "10px", whiteSpace: "pre-line" }}>
          {recipe.ingredients}
        </p>
        <h3 style={{ marginTop: "10px" }}>Instructions</h3>
        <p style={{ marginTop: "10px", whiteSpace: "pre-line" }}>
          {recipe.instructions}
        </p>
      </div>
      <Link to="/recipes">
        <FontAwesomeIcon icon={faArrowLeftLong} className="back-arrow" />
      </Link>
    </>
  );
}

export default RecipeDetail;
