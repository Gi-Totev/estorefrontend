import React, { useState, useReducer, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { signIn } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import { userSignInReducer } from "../reducers/userReducer";
import { Store } from "../store/store";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const context = useContext(Store);
  const [state, dispatch] = useReducer(userSignInReducer, context);

  const { userInfo, loading, error } = state;

  const submitHandler = (e) => {
    e.preventDefault();
    signIn(dispatch, email, password);
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New customer?{" "}
            <Link to={`/register?redirect=${redirect}`}>Create an account</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
