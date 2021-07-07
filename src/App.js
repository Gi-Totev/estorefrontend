import { useContext, useReducer } from "react";
import { BrowserRouter, Route, useHistory } from "react-router-dom";
import { signOut } from "./actions/userActions";
import {
  Cart,
  Home,
  Register,
  ShippingAddress,
  PaymentMethod,
  Products,
  Signin,
  Profile,
  PlaceOrder,
  OrderDetails,
  OrderHistory,
} from "./pages/";
import { userSignInReducer } from "./reducers/userReducer";
import { Store } from "./store/store";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const context = useContext(Store);
  const [state, dispatch] = useReducer(userSignInReducer, context);
  const history = useHistory();
  const { cartItems, userInfo } = state;

  const signOutHandler = () => {
    signOut(dispatch);
    history.push("/");
  };

  return (
    <BrowserRouter>
      <div className="grid-container">
        <Navbar
          cartItems={cartItems}
          userInfo={userInfo}
          signOutHandler={signOutHandler}
        ></Navbar>

        <main>
          <Route exact path="/product/:id" component={Products} />
          <Route exact path="/cart/:id?" component={Cart} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/shipping" component={ShippingAddress} />
          <Route exact path="/payment" component={PaymentMethod} />
          <Route exact path="/placeorder" component={PlaceOrder} />
          <Route exact path="/order/:id" component={OrderDetails} />
          <Route exact path="/orderhistory" component={OrderHistory} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/" component={Home} />
        </main>

        <footer className="row center">Footer</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
