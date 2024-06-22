import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Right = ({ iteam, codes }) => {
  const [price, setPrice] = useState(0);
  const [deliveryMessage, setDeliveryMessage] = useState("");
  useEffect(() => {
    totalAmount();
  }, [iteam]);

  const totalAmount = () => {
    let tempPrice = 0;
    iteam.forEach((item) => {
      let discounted_prices = item.price - (item.price * item.discount) / 100;
      tempPrice += discounted_prices;
    });

    if (tempPrice >= 200) {
      setDeliveryMessage("Your order is eligible for FREE Delivery.");
    } else {
      tempPrice += 20;
      setDeliveryMessage(
        "Your order is not eligible for FREE Delivery (20 lei delivery cost)."
      );
    }

    setPrice(tempPrice);
  };

  return (
    <div className="right_buy">
      <div className="cost_right">
        <p>{deliveryMessage}</p>
        <br />
        <span style={{ color: "#565959" }}>
          We are glad to have you as a client
        </span>
        <h3>
          Subtotal ({iteam.length} items):
          <span style={{ fontWeight: 700 }}>{price} lei</span>
        </h3>
        <button className="rightbuy_btn">
          <NavLink to={`/pay`} className="navLink-no-underline">
            Proceed to buy
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default Right;
