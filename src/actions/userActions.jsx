import Axios from "axios";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SIGNOUT,
  USER_SIGNIN_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";

export const signIn = async (dispatch, email, password) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
    const { data } = await Axios.post(
      "https://estorebackenddemo.herokuapp.com/api/users/signin",
      { email, password }
    );

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    window.location.reload();
  } catch (error) {
    console.log(error);
    console.log(email);
    console.log(password);
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const register = async (dispatch, name, email, password) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });

  try {
    const { data } = await Axios.post(
      "https://estorebackenddemo.herokuapp.com/api/users/register",
      {
        name,
        email,
        password,
      }
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signOut = (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");

  dispatch({ type: USER_SIGNIN_SIGNOUT });
};

export const detailsUser = async (dispatch, userId, token) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });

  try {
    const { data } = await Axios.get(
      `https://estorebackenddemo.herokuapp.com/api/users/${userId}`,
      {
        headers: { auth: `Bearer ${token}` },
      }
    );
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const updateUserProfile = async (dispatch, id, user, userInfo) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });

  try {
    const { data } = await Axios.put(
      `https://estorebackenddemo.herokuapp.com/api/users/profile`,
      user,
      {
        headers: { auth: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};
