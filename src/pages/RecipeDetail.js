import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { Button, TextField, Dialog, DialogContent } from "@mui/material";
import swal from "sweetalert";
import { useDispatch } from "react-redux";
import { deleteRecipe, updateRecipe } from "../actions/action";

function RecipeDetail() {
  const location = useLocation();
  const { recipe } = location.state;
  const [open, setOpen] = useState(false);
  const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isadmin = sessionStorage.getItem("Admin");

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedRecipe({ ...updatedRecipe, [name]: value });
  };

  const handleUpdateRecipe = async () => {
    const recipeDoc = doc(db, "recipe", recipe.id);
    await updateDoc(recipeDoc, updatedRecipe);
    dispatch(updateRecipe(updatedRecipe));
    setOpen(false);
    navigate("/recipes");
  };

  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the file",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        const handleDeleteRecipe = async () => {
          const recipeDoc = doc(db, "recipe", recipe.id);
          await deleteDoc(recipeDoc);
          dispatch(deleteRecipe(recipe.id));
          navigate("/recipes");
        };
        handleDeleteRecipe();
      }
    });
  };

  return (
    <>
      <div className="recipeDetailConatiner">
        <div className="wrapper-div">
          <h2 className="capitalise">{recipe.title}</h2>
          {isadmin && (
            <div>
              <FontAwesomeIcon
                icon={faPen}
                onClick={() => setOpen(true)}
                className="edit-icon"
              />
              <FontAwesomeIcon
                icon={faTrash}
                className="trash-icon"
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
        <img src={recipe.image} alt="food" />
        <h3>Ingredients</h3>
        <p>{recipe.ingredients}</p>
        <h3>Instructions</h3>
        <p>{recipe.instructions}</p>
      </div>
      <Link to="/recipes">
        <FontAwesomeIcon icon={faArrowLeftLong} className="back-arrow" />
      </Link>
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
            value={updatedRecipe.date}
            onChange={handleInputChange}
            className="textfield"
          />
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={updatedRecipe.title}
            onChange={handleInputChange}
            className="textfield"
          />
          <TextField
            id="image"
            label="Image"
            variant="outlined"
            fullWidth
            name="image"
            value={updatedRecipe.image}
            onChange={handleInputChange}
            className="textfield"
          />
          <TextField
            id="category"
            label="Category"
            variant="outlined"
            fullWidth
            name="category"
            value={updatedRecipe.category}
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
            value={updatedRecipe.ingredients}
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
            value={updatedRecipe.instructions}
            onChange={handleInputChange}
            className="textfield"
          />
          <div className="submit-btn">
            <Button onClick={handleUpdateRecipe}>Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default RecipeDetail;
