import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import {
  Switch,
  FormGroup,
  FormControlLabel,
  Dialog,
  DialogContent,
  TextField,
  Button,
  debounce,
} from "@mui/material";
import {
  setNonVeg,
  setVeg,
  setFilteredRecipe,
  setSearch,
  addNewRecipe,
  displayLikedRecipe,
} from "../actions/action";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { AnimatePresence } from "framer-motion";
export default function Recipes() {
  const filteredRecipe = useSelector((state) => state.category.filteredRecipe);
  const dispatch = useDispatch();
  const [searchString, setSearchString] = useState("");
  const vegRecipeState = useSelector((state) => state.category.veg);
  const nonVegRecipeState = useSelector((state) => state.category.nonVeg);
  const likedRecipeState = useSelector((state) => state.category.liked);
  const [open, setOpen] = useState(false);
  const recipeObj = {
    sortId: new Date().getTime(),
    date: "",
    title: "",
    image: "",
    category: "",
    ingredients: "",
    instructions: "",
  };

  const [newRecipe, setNewRecipe] = useState(recipeObj);
  const recipeCollectionRef = collection(db, "recipe");
  const isadmin = sessionStorage.getItem("Admin");

  const [likedRecipe, setLikedRecipe] = useState(
    JSON.parse(localStorage.getItem("likedRecipe"))
  );

  useEffect(() => {
    if (!sessionStorage.getItem("recipeVisit")) {
      window.scrollTo(0, 0);
      sessionStorage.removeItem("recipeVisit");
    } else {
      window.scrollTo(0, Number(sessionStorage.getItem("pageOffset")));
    }
  }, []);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const addRecipe = async () => {
    await addDoc(recipeCollectionRef, newRecipe);
    dispatch(addNewRecipe(newRecipe));
    setOpen(false);
    setNewRecipe(recipeObj);
  };

  const handleLikedRecipe = () => {
    const isLiked = !likedRecipeState;
    if (isLiked) {
      dispatch(setVeg(false));
      dispatch(setNonVeg(false));
    }
    dispatch(
      displayLikedRecipe({ likedRecipe: likedRecipe?likedRecipe:[], isLiked: isLiked })
    );
  };

  const handleSearch = debounce((text) => {
    setSearchString(text);
  }, 500);

  return (
    <div>
      <div className="searches section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search All..."
            onChange={(e) => handleSearch(e.target.value)}
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
          <FormControlLabel
            className={`form-label ${likedRecipeState && "liked"}`}
            control={
              <p style={{ marginLeft: "2px" }}>
                {!likedRecipeState ? (
                  <FontAwesomeIcon icon={faHeart} className="heartIcon" />
                ) : (
                  <FontAwesomeIcon icon={solidHeart} className="heartIcon" />
                )}
              </p>
            }
            label="Liked "
            labelPlacement="start"
            onClick={handleLikedRecipe}
          />
          {isadmin && (
            <Button onClick={() => setOpen(true)} className="add-btn">
              Add
              <FontAwesomeIcon icon={faPlus} className="plus-icon" />
            </Button>
          )}
        </FormGroup>
      </div>
      <div className="recipes-container">
        <AnimatePresence>
          {filteredRecipe.map((recipe, index) => (
            <RecipeCard
              key={recipe.title}
              recipe={recipe}
              likedRecipe={likedRecipe}
              setLikedRecipe={setLikedRecipe}
            />
          ))}
        </AnimatePresence>
      </div>

      <Dialog
        open={open}
        PaperProps={{
          style: { borderRadius: 10 },
        }}
        onClose={() => setOpen(false)}
      >
        <DialogContent>
          <h3>Add Recipe</h3>
          <TextField
            id="date"
            label="Date"
            variant="outlined"
            fullWidth
            name="date"
            value={newRecipe.date}
            onChange={handleInputChange}
            className="textfield"
          />
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={newRecipe.title}
            onChange={handleInputChange}
            className="textfield"
          />
          <TextField
            id="image"
            label="Image"
            variant="outlined"
            fullWidth
            name="image"
            value={newRecipe.image}
            onChange={handleInputChange}
            className="textfield"
          />
          <TextField
            id="category"
            label="Category"
            variant="outlined"
            fullWidth
            name="category"
            value={newRecipe.category}
            onChange={handleInputChange}
            className="textfield"
          />
          <TextField
            id="ingredients"
            label="Ingredients"
            variant="outlined"
            fullWidth
            name="ingredients"
            multiline={true}
            value={newRecipe.ingredients}
            onChange={handleInputChange}
            className="textfield"
          />
          <TextField
            id="instructions"
            label="Instructions"
            multiline={true}
            variant="outlined"
            fullWidth
            name="instructions"
            value={newRecipe.instructions}
            onChange={handleInputChange}
            className="textfield"
          />
          <div className="submit-btn">
            <Button onClick={addRecipe}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
