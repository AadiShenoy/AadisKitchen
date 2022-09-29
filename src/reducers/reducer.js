import { ActionTypes } from "../constants/action-types";

const initialState = {
  recipe: [],
  filteredRecipe: [],
  vegFilter: [],
  nonVegFilter: [],
  veg: false,
  nonVeg: false,
  dark: false,
  count: 0,
  liked: false,
  likedFilter: [],
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_RECIPE:
      return { ...state, recipe: payload, filteredRecipe: payload };

    case ActionTypes.SET_COUNT:
      return { ...state, count: payload };

    case ActionTypes.SET_FILTERED_RECIPE:
      return { ...state, filteredRecipe: state.recipe };

    case ActionTypes.ADD_NEW_RECIPE:
      return {
        ...state,
        filteredRecipe: [payload, ...state.recipe],
        recipe: [payload, ...state.recipe],
      };

    case ActionTypes.DELETE_RECIPE:
      let recipeAfterDelete = state.filteredRecipe.filter(
        (recipe) => recipe.id !== payload
      );
      return { ...state, recipe: recipeAfterDelete };

    case ActionTypes.UPDATE_RECIPE:
      let tempRecipeArray = [...state.recipe];
      for (let i = 0; i < tempRecipeArray.length; i++) {
        if (tempRecipeArray[i].id === payload.id) {
          tempRecipeArray[i] = payload;
        }
      }
      return { ...state, recipe: tempRecipeArray };

    case ActionTypes.SET_LIKED_RECIPE:
      let tempArray = [...state.recipe];
      let likedRecipe = [];
      if (payload.isLiked) {
        tempArray.forEach((item) => {
          if (payload.likedRecipe.includes(item.title)) {
            likedRecipe.push(item);
          }
        });
        return {
          ...state,
          likedFilter: likedRecipe,
          liked: true,
          filteredRecipe: likedRecipe,
        };
      } else {
        return {
          ...state,
          liked: false,
          filteredRecipe: tempArray,
        };
      }

    case ActionTypes.SET_VEG:
      if (payload) {
        const vegRecipe = state.recipe.filter((item) => {
          return item.category === "veg";
        });
        return {
          ...state,
          veg: payload,
          liked:false,
          filteredRecipe: vegRecipe,
          vegFilter: vegRecipe,
        };
      } else {
        return {
          ...state,
          veg: payload,
        };
      }

    case ActionTypes.SET_NONVEG:
      if (payload) {
        const nonVegRecipe = state.recipe.filter((item) => {
          return item.category !== "veg";
        });
        return {
          ...state,
          nonVeg: payload,
          liked:false,
          filteredRecipe: nonVegRecipe,
          nonVegFilter: nonVegRecipe,
        };
      } else {
        return {
          ...state,
          nonVeg: payload,
        };
      }

    case ActionTypes.SET_SEARCH:
      let tempFilter;
      if (state.veg) {
        tempFilter = state.vegFilter.filter((item) => {
          return item.title.toLowerCase().includes(payload.toLowerCase());
        });
      } else if (state.nonVeg) {
        tempFilter = state.nonVegFilter.filter((item) => {
          return item.title.toLowerCase().includes(payload.toLowerCase());
        });
      } else if (state.liked) {
        console.log("first");
        console.log(state.likedFilter);
        tempFilter = state.likedFilter.filter((item) => {
          return item.title.toLowerCase().includes(payload.toLowerCase());
        });
      } else {
        tempFilter = state.recipe.filter((item) => {
          return item.title.toLowerCase().includes(payload.toLowerCase());
        });
      }
      return { ...state, filteredRecipe: tempFilter };

    case ActionTypes.SET_DARK:
      return { ...state, dark: payload };

    default:
      return state;
  }
};
