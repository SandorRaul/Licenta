import React from "react";
import { useEffect, useState } from "react";

const Subtotal = ({ iteam }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [iteam]);

  const totalAmount = () => {
    let price = 0;
    iteam.map((item) => {
      let discounted_prices = item.price - (item.price * item.discount) / 100;
      price += discounted_prices;
    });
    setPrice(price);
  };

  return (
    <div className="sub_item">
      <h3>
        Subtotal ({iteam.length} items):
        <strong style={{ fontWeight: "700", color: "#111" }}>
          {" "}
          {price} lei
        </strong>
      </h3>
    </div>
  );
};

export default Subtotal;
