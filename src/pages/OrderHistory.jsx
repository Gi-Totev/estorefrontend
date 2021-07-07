import React, { useContext, useReducer, useEffect } from "react";
import { listOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import MessageBox from "../components/MessageBox/MessageBox";
import { orderListReducer } from "../reducers/orderReducer";
import { Store } from "../store/store";

const OrderHistory = (props) => {
  const context = useContext(Store);
  const [state, dispatch] = useReducer(orderListReducer, context);
  const { loading, error, orders } = state;

  useEffect(() => {
    listOrder(dispatch, context);
  }, [dispatch]);

  return (
    <div>
      <h1>Order History</h1>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
      {orders ? (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date of Order</th>
              <th>Total Price</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substr(0, 10)}</td>
                <td>{order.total.toFixed(2)} $</td>
                <td>{order.isPaid ? order.paidAt.substr(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered ? order.deliveredAt.substr(0, 10) : "No"}
                </td>
                <td>
                  <button
                    className="small"
                    type="button"
                    onClick={() => props.history.push(`/order/${order._id}`)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default OrderHistory;
