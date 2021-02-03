import {
  SET_LOADING,
  SET_METADATA,
  SET_PLACE,
} from "./constants/ActionTypes.js";
import { Store } from "./helper/store/Store.js";

const initialState = {
  places: [],
  menus: [],
  isLoading: false,
  lastUpdated: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_METADATA:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        places: action.places,
      };
    case SET_PLACE:
      return {
        ...state,
        menus: action.menus,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.value,
      };
    default:
      return state;
  }
}

export const store = new Store(reducer);
