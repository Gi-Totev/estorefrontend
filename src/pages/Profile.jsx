import React, { useContext, useEffect, useReducer, useState } from "react";
import { Store } from "../store/store";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import {
  userDetailsReducer,
  userUpdateProfileReducer,
} from "../reducers/userReducer";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

const Profile = (props) => {
  const context = useContext(Store);
  const [state, dispatch] = useReducer(userDetailsReducer, context);

  if (!context.userInfo) {
    props.history.push("/signin");
  }

  const [update, updateDispatch] = useReducer(
    userUpdateProfileReducer,
    context
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userId = context.userInfo._id;
  const token = context.userInfo.token;

  const { loading, error, user } = state;

  useEffect(() => {
    if (!user) {
      if (userId) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        detailsUser(dispatch, userId, token);
      }
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, userId, token, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      console.log({ name, email, password, confirmPassword });
      updateUserProfile(
        updateDispatch,
        userId,
        {
          name,
          email,
          password,
        },
        context.userInfo
      );
    } else {
      alert("Passwords do not match");
    }
  };

  const {
    success: updateSuccess,
    loading: updateLoading,
    error: updateError,
  } = update;

  return (
    <div>
      <form onSubmit={submitHandler} className="form">
        <div>
          <h1>User Profile</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {user && (
          <>
            {updateLoading && <LoadingBox></LoadingBox>}
            {updateError && <MessageBox variant="danger">{error}</MessageBox>}
            {updateSuccess && (
              <MessageBox variant="success">
                Profile Updated Successfuly
              </MessageBox>
            )}
            <div>
              <label htmlFor="name">Name</label>
              <input
                autoComplete="off"
                type="text"
                id="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                autoComplete="off"
                type="email"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                autoComplete="off"
                type="password"
                id="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                autoComplete="off"
                type="password"
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div>
              <button type="submit" className="primary">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Profile;
