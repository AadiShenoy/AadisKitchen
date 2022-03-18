import React from "react";
import { useLocation } from "react-router-dom";
function RecipeDetail() {
  const location = useLocation();
  const { recipe } = location.state;
  return (
    <div>
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
      <p style={{ marginTop: "10px" }}>{recipe.ingredients}</p>
      <h3 style={{ marginTop: "10px" }}>Instructions</h3>
      <p style={{ marginTop: "10px" }}>{recipe.instructions}</p>
    </div>
  );
}

export default RecipeDetail;
