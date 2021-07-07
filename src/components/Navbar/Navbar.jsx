import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Store } from "../../store/store";

const Navbar = ({ signOutHandler }) => {
  const { userInfo, cartItems } = useContext(Store);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          E Store
        </Link>
      </div>
      <div>
        <Link to="/cart">
          {" "}
          Cart{" "}
          {cartItems?.length > 0 && (
            <span className="badge">{cartItems.length}</span>
          )}
        </Link>
        {userInfo ? (
          <div className="dropdown">
            <Link to="#">
              {userInfo.name} <i className="fa fa-caret-down"></i>
            </Link>
            <ul className="dropdown-content">
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/orderhistory"> Order History</Link>
              </li>
              <li>
                <Link to="/signout" onClick={signOutHandler}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/signin"> Sign In </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
