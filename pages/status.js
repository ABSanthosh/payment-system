import { useRouter } from "next/router";
import React from "react";

export default function Status() {
  const router = useRouter();

  const [user, setUser] = React.useState();
  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"))
      ? JSON.parse(localStorage.getItem("user"))
      : { userId: "" };
    localUser.userId ? router.push("/status") : router.push("/");
    setUser(localUser);

    const localOrders = JSON.parse(localStorage.getItem("Events"))
      ? JSON.parse(localStorage.getItem("Events"))
      : [];

    setOrders(localOrders);
  }, []);
  console.log(orders);
  return (
    <div>
      <h1>Status</h1>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.orderId}>
            <h3>
              {order.Events.filter((item) => item.isSelected).map(
                (event, index) => (
                  <span key={index}>{event.name}, </span>
                )
              )}
            </h3>
            <p>
              {order.orderId} - Rs.{order.total}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
