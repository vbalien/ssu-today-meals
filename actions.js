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
    alert("정보를 가져오는 중 오류가 발생하였습니다.");
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
    alert("정보를 가져오는 중 오류가 발생하였습니다.");
  } finally {
    dispatch({
      type: REQUEST_PLACE_FINALLY,
    });
  }
};
