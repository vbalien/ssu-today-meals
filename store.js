import { CHANGE_TITLE } from "./constants/ActionTypes.js";
import { Store } from "./helper/store/Store.js";

const initialState = {
  title: "hello world!",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.value,
      };
      break;
    default:
      return state;
  }
}

export const store = new Store(reducer);
