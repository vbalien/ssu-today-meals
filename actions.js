import { SET_ANITABLE } from "./constants/ActionTypes.js";
import { getAniList } from "./repo/index.js";

export const fetchAnitable = (week) => async (dispatch) => {
  const res = await getAniList(week);
  const data = await res.json();
  dispatch({ type: SET_ANITABLE, value: data });
};
