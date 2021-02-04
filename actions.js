import {
  SET_MENUS,
  SET_METADATA,
  REQUEST_PLACE,
  REQUEST_PLACE_FINALLY,
} from "./constants/ActionTypes.js";
import { getMetadata, getPlace } from "./repo/index.js";

export const fetchMetadata = () => async (dispatch) => {
  try {
    const res = await getMetadata();
    const data = await res.json();
    dispatch({ type: SET_METADATA, ...data });
  } catch (err) {
    if (err instanceof TypeError) alert(err.message);
  }
};

export const fetchPlace = (placeId) => async (dispatch, getState) => {
  const { controller } = getState();
  controller.abort();
  const newController = new AbortController();
  try {
    dispatch({ type: REQUEST_PLACE, waiting: true, controller: newController });
    const res = await getPlace(placeId);
    const data = await res.json();
    dispatch({ type: SET_MENUS, name: data.name, value: data.menus });
  } catch (err) {
    if (err instanceof TypeError) alert(err.message);
  } finally {
    dispatch({
      type: REQUEST_PLACE_FINALLY,
    });
  }
};
