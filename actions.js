import {
  SET_MENUS,
  SET_METADATA,
  SET_LOADING,
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

export const fetchPlace = (placeId) => async (dispatch) => {
  try {
    dispatch({ type: SET_LOADING, value: true });
    const res = await getPlace(placeId);
    const data = await res.json();
    dispatch({ type: SET_MENUS, name: data.name, value: data.menus });
  } catch (err) {
    alert("정보를 가져오는 중 오류가 발생하였습니다.");
  } finally {
    dispatch({ type: SET_LOADING, value: false });
  }
};
