import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector, useDispatch } from "react-redux";

import {
  setNonVeg,
  setVeg,
  setFilteredRecipe,
  setSearch,
} from "../actions/action";

export default function Recipes() {
  const filteredRecipe = useSelector((state) => state.category.filteredRecipe);
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const vegRecipeState = useSelector((state) => state.category.veg);
  const nonVegRecipeState = useSelector((state) => state.category.nonVeg);

  useEffect(() => {
    dispatch(setSearch(searchString));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  const handleVeg = (event) => {
    dispatch(setVeg(event.target.checked));
    if (event.target.checked === true) {
      dispatch(setNonVeg(false));
    } else {
      dispatch(setFilteredRecipe());
    }
  };
  const handleNonVeg = (event) => {
    dispatch(setNonVeg(event.target.checked));
    if (event.target.checked === true) {
      dispatch(setVeg(false));
    } else {
      dispatch(setFilteredRecipe());
    }
  };

  return (
    <div>
      <div className="searches section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search All..."
            onChange={(e) => setSearchString(e.target.value)}
          />
          <button className="btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <FormGroup aria-label="position" row>
          <FormControlLabel
            className="form-label"
            control={
              <Switch
                checked={vegRecipeState}
                onChange={handleVeg}
                color="default"
                style={{ color: vegRecipeState ? "black" : "white" }}
              />
            }
            label="Veg"
            labelPlacement="start"
          />
          <FormControlLabel
            className="form-label"
            control={
              <Switch
                checked={nonVegRecipeState}
                onChange={handleNonVeg}
                color="default"
                style={{ color: nonVegRecipeState ? "black" : "white" }}
              />
            }
            label="Non-Veg"
            labelPlacement="start"
          />
        </FormGroup>
      </div>
      <div className="recipes-container">
        {filteredRecipe.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
