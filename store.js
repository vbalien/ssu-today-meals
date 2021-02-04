import {
  REQUEST_PLACE,
  REQUEST_PLACE_FINALLY,
  SET_METADATA,
  SET_MENUS,
} from "./constants/ActionTypes.js";
import { Store } from "./helper/store/Store.js";

const initialState = {
  places: [],
  menus: [],
  isLoading: false,
  lastUpdated: 0,
  controller: new AbortController(),
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_METADATA:
      return {
        ...state,
        lastUpdated: action.lastUpdated,
        places: action.places,
      };
    case SET_MENUS:
      return {
        ...state,
        menus: action.value,
      };
    case REQUEST_PLACE:
      return {
        ...state,
        isLoading: action.waiting,
        controller: action.controller,
      };
    case REQUEST_PLACE_FINALLY:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

export const store = new Store(reducer);
