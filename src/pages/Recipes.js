import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  setNonVeg,
  setVeg,
  setFilteredRecipe,
  setSearch,
} from "../actions/action";

export default function Recipes() {
  const recipe = useSelector((state) => state.category.recipe);
  const filteredRecipe = useSelector((state) => state.category.filteredRecipe);
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const [vegRecipeState, setVegRecipeState] = useState(
    useSelector((state) => state.category.veg)
  );
  const [nonVegRecipeState, setnonVegRecipeState] = useState(
    useSelector((state) => state.category.nonVeg)
  );

  useEffect(() => {
    dispatch(setSearch(searchString));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  const handleVeg = (event) => {
    setVegRecipeState(event.target.checked);
    dispatch(setVeg(event.target.checked));
    if (event.target.checked === true) {
      setnonVegRecipeState(false);
      dispatch(setNonVeg(false));
    } else {
      dispatch(setFilteredRecipe(recipe));
    }
  };
  const handleNonVeg = (event) => {
    setnonVegRecipeState(event.target.checked);
    dispatch(setNonVeg(event.target.checked));
    if (event.target.checked === true) {
      setVegRecipeState(false);
      dispatch(setVeg(false));
    } else {
      dispatch(setFilteredRecipe(recipe));
    }
  };

  return (
    <div>
      <div className="previous-searches section">
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
                color="warning"
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
                color="warning"
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
