import React, { useState, useContext, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";

import axios from "axios";

const OrdersPage = ({ token }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const init = async () => {
      const res = await axios.get("/api/orders", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      setOrders(
        res.data.sort(
          (a, b) =>
            new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
        )
      );
    };
    init();
  }, []);

  return (
    <div>
      <Container>
        {orders.map((j) => (
          <>
            <div>
              <h3>
                הזמנה מ{j.details.name} <span>{j.order_date}</span>
              </h3>
            </div>
            {j.cart.map((i) => (
              <>
                <div>
                  {i.name} - כמות:{i.price} |{" "}
                  {i.count * i.unit_count * i.estimate_quantity_per_unit}{" "}
                  {i.unit_name} {i.price ? "₪" + i.price * i.count : "אין מחיר"}
                </div>
              </>
            ))}
            <p>
              סה"כ: ₪
              {j.cart
                .map((a) =>
                  a.price && a.count
                    ? a.price * a.count * a.estimate_quantity_per_unit
                    : 0
                )
                .reduce((a, b) => a + b, 0)}
            </p>
            <Divider style={{ marginTop: 20 }} />
          </>
        ))}
      </Container>
    </div>
  );
};

export default OrdersPage;
