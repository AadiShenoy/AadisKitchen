import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Recipes({ recipe }) {
  const [filteredRecipe, setFilteredRecipe] = useState(recipe);
  const [search, setSearch] = useState("");

  useEffect(() => {
      setFilteredRecipe(
        recipe.filter((fitem) => {
          return fitem.title.toLowerCase().includes(search.toLowerCase());
        })
      );
  }, [search, recipe]);

  return (
    <div>
      <div className="previous-searches section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search ..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
      <div className="recipes-container">
        {filteredRecipe.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
