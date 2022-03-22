import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Recipes({ recipe }) {
  const [filteredRecipe, setFilteredRecipe] = useState(recipe);
  const [search, setSearch] = useState("");
  const [allRecipeState, setallRecipeState] = useState(true);
  const [vegRecipeState, setVegRecipeState] = useState(false);
  const [nonVegRecipeState, setnonVegRecipeState] = useState(false);
  useEffect(() => {
    setallRecipeState(true);
    setVegRecipeState(false);
    setnonVegRecipeState(false);
    setFilteredRecipe(
      recipe.filter((fitem) => {
        return fitem.title.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, recipe]);

  const allrecipe = () => {
    setVegRecipeState(false);
    setnonVegRecipeState(false);
    setallRecipeState(true);
    setFilteredRecipe(recipe);
  };

  const vegRecipe = () => {
    setallRecipeState(false);
    setnonVegRecipeState(false);
    setVegRecipeState(true);
    setFilteredRecipe(
      recipe.filter((item) => {
        return item.category === "veg";
      })
    );
  };

  const nonVegRecipe = () => {
    setVegRecipeState(false);
    setallRecipeState(false);
    setnonVegRecipeState(true);
    setFilteredRecipe(
      recipe.filter((item) => {
        return item.category !== "veg";
      })
    );
  };

  return (
    <div>
      <div className="previous-searches section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search All..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <button
          className="filterButton"
          onClick={allrecipe}
          style={{ backgroundColor: allRecipeState ? "#f7e5e4" : "white" }}
        >
          All
        </button>
        <button
          className="filterButton left"
          onClick={vegRecipe}
          style={{ backgroundColor: vegRecipeState ? "#f7e5e4" : "white" }}
        >
          Veg
        </button>
        <button
          className="filterButton left"
          onClick={nonVegRecipe}
          style={{ backgroundColor: nonVegRecipeState ? "#f7e5e4" : "white" }}
        >
          Non-Veg
        </button>
      </div>
      <div className="recipes-container">
        {filteredRecipe.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
