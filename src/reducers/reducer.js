import { ActionTypes } from "../constants/action-types";

const initialState = {
  recipe: [],
  filteredRecipe: [],
  vegFilter: [],
  nonVegFilter: [],
  veg: false,
  nonVeg: false,
  light: true,
  dark: false,
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_RECIPE:
      return { ...state, recipe: payload, filteredRecipe: payload };

    case ActionTypes.SET_FILTERED_RECIPE:
      return { ...state, filteredRecipe: payload };

    case ActionTypes.SET_VEG:
      if (payload) {
        const vegRecipe = state.recipe.filter((item) => {
          return item.category === "veg";
        });
        return {
          ...state,
          veg: payload,
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
      } else {
        tempFilter = state.recipe.filter((item) => {
          return item.title.toLowerCase().includes(payload.toLowerCase());
        });
      }
      return { ...state, filteredRecipe: tempFilter };

    case ActionTypes.SET_LIGHT:
      return { ...state, light: payload };

    case ActionTypes.SET_DARK:
      return { ...state, dark: payload };

    default:
      return state;
  }
};
