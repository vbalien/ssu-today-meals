import { SET_ANITABLE } from "./constants/ActionTypes.js";
import { Store } from "./helper/store/Store.js";

const initialState = {
  anitable: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ANITABLE:
      return {
        ...state,
        anitable: action.value,
      };
      break;
    default:
      return state;
  }
}

export const store = new Store(reducer);
