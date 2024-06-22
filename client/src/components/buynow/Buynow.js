import { Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import Option from "./Option";
import Right from "./Right";
import Subtotal from "./Subtotal";
import "./buynow.css";
const Buynow = () => {
  const [cartdata, setCartdata] = useState([]);
  const [availableCodes, setAvailableCodes] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);

  console.log(cartdata.carts);
  console.log(availableCodes);
  console.log(availableProducts);

  const getdatabuy = async () => {
    const res = await fetch("/cartdetails", {
      method: "GET",
      headers: {
        Aceept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (res.status !== 201) {
      console.log("error");
    } else {
      setCartdata([]);
      setCartdata(data.buyuser.carts || []);
      setAvailableCodes(data.availableProductsCodes || []);
    }
  };
  useEffect(() => {
    getdatabuy();
  }, []);
  useEffect(() => {
    const filteredProducts = cartdata.filter((product) =>
      availableCodes.includes(product.code)
    );
    setAvailableProducts(filteredProducts);
  }, [cartdata, availableCodes]);

  return (
    <>
      {cartdata.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>All items selected</p>
              <span className="leftbuyprice">Size</span>
              <Divider />
              {cartdata.map((e, k) => {
                const isAvailable = availableProducts.some(
                  (product) => product.code === e.code
                );
                if (!isAvailable) {
                  console.log(
                    `Available Product: ${e.title.longTitle} with code: ${e.code}`
                  );
                }

                return (
                  <div
                    className={`item_containert ${
                      !isAvailable ? "unavailable" : ""
                    }`}
                    key={k}
                  >
                    {!isAvailable && (
                      <div className="unavailable-overlay">
                        <div className="unavailable-overlay-text">
                          Out of stock
                        </div>
                      </div>
                    )}
                    <img src={e.detailUrl} alt="" />
                    <div className="item_details">
                      <h3>{e.title.longTitle}</h3>
                      <h3>Category: {e.title.shortTitle}</h3>
                      <h3>
                        Price with discount applicated:{" "}
                        {(e.price - (e.price * e.discount) / 100).toFixed(2)}{" "}
                        lei
                      </h3>
                      <p className="unusall">Usually dispatched in 8 days.</p>
                      <p>Eligible for Shipping</p>
                      <Option
                        deletedata={e.code}
                        deletesize={Object.keys(e.size)}
                        get={getdatabuy}
                        id={e.id}
                      />
                    </div>
                    <h3 className="item_price">{Object.keys(e.size)}</h3>
                  </div>
                );
              })}

              <Divider />
              <Subtotal iteam={availableProducts} />
            </div>
            <Right iteam={availableProducts} codes={availableCodes} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Buynow;
