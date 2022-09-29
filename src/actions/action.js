import { ActionTypes } from "../constants/action-types";

export const setRecipe = (recipe) => {
  return {
    type: ActionTypes.SET_RECIPE,
    payload: recipe,
  };
};

export const deleteRecipe = (recipe) => {
  return {
    type: ActionTypes.DELETE_RECIPE,
    payload: recipe,
  };
};

export const updateRecipe = (recipe) => {
  return {
    type: ActionTypes.UPDATE_RECIPE,
    payload: recipe,
  };
};

export const setCount = (count) => {
  return {
    type: ActionTypes.SET_COUNT,
    payload: count,
  };
};

export const addNewRecipe = (recipe) => {
  return {
    type: ActionTypes.ADD_NEW_RECIPE,
    payload: recipe,
  };
};

export const setFilteredRecipe = () => {
  return {
    type: ActionTypes.SET_FILTERED_RECIPE,
  };
};

export const displayLikedRecipe = (recipe) => {
  return {
    type: ActionTypes.SET_LIKED_RECIPE,
    payload: recipe,
  };
}

export const setVeg = (veg) => {
  return {
    type: ActionTypes.SET_VEG,
    payload: veg,
  };
};

export const setNonVeg = (nonVeg) => {
  return {
    type: ActionTypes.SET_NONVEG,
    payload: nonVeg,
  };
};

export const setSearch = (search) => {
  return {
    type: ActionTypes.SET_SEARCH,
    payload: search,
  };
};

export const setDark = (bool) => {
  return {
    type: ActionTypes.SET_DARK,
    payload: bool,
  };
};
