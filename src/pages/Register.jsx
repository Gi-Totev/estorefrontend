import React, { useState, useReducer, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import { userSignInReducer } from "../reducers/userReducer";
import { Store } from "../store/store";

const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const context = useContext(Store);
  const [state, dispatch] = useReducer(userSignInReducer, context);

  const { userInfo, loading, error } = state;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
    } else {
      register(dispatch, name, email, password);
    }
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
          <h1>Create Account</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">name Address</label>
          <input
            type="name"
            id="name"
            placeholder="Enter your name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <label htmlFor="confirmPassword">Password</label>
          <input
            type="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Register
          </button>
        </div>
        <div>
          <label />
          <div>
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
