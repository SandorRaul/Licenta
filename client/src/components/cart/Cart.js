import React, { useContext, useEffect, useState } from "react";
import "./cart.css";
import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";

const Cart = () => {
  const { code } = useParams("");
  //  const {code} = useParams("");
  console.log(code);

  const { account, setAccount } = useContext(LoginContext);
  const [inddata, setInddata] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  console.log(inddata);
  const getinddata = async () => {
    const res = await fetch(`/getproductsoneclothes/${code}`, {
      method: "GET",
      headers: {
        // "Content-Type":"application/json"
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    if (res.status !== 201) {
      console.log("no data available ");
    } else {
      //  console.log("getdata");

      setInddata(data);
    }
  };

  useEffect(() => {
    setTimeout(getinddata, 1000);
    getinddata();
  }, [code]);

  //add  cart function
  const addtocart = async (id) => {
    if (!selectedSize) {
      // Dacă nu este selectată o mărime, afișăm un toast și oprim execuția funcției
      toast.warn("Please select a size before adding to cart", {
        position: "top-center",
        autoClose: 2000,
      });
      return; // Oprirea execuției funcției
    }
    if (!account) {
      // Utilizatorul nu este conectat, afișăm un toast și oprim execuția funcției
      toast.warn("Connect into your account", {
        position: "top-center",
        autoClose: 2500,
      });
      return; // Oprirea execuției funcției
    }
    // Include mărimea selectată și datele produsului în corpul cererii
    const checkres = await fetch(`/addcart/${id}/${selectedSize}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inddata),
      credentials: "include",
    });

    const data1 = await checkres.json();
    console.log(data1);

    if (checkres.status === 401 || !data1) {
      console.log("user invalid");
      alert("user invalid");
    } else {
      // alert("data added in your cart")
      //history("/buynow")
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      setAccount(data1);
    }
  };
  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size === selectedSize ? "" : size);
  };

  return (
    <div className="cart_section">
      <ToastContainer />
      {inddata && Object.keys(inddata).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={`${inddata.detailUrl}`} alt="cart_img" />
            <img src={inddata.url} alt="cart_img" />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(inddata.code)}
                style={{ marginTop: "20px" }}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title.longTitle}</h3>
            <Divider />
            <p className="mrp">Price : {inddata.price} lei</p>
            <div className="discount_box">
              <h5>
                Discount:{" "}
                <span style={{ color: "#111" }}>{inddata.discount}%</span>
              </h5>
              <h4>
                Free Delivery:{" "}
                <span style={{ color: "#111", fontWeight: 600 }}>
                  Orders over 300 lei
                </span>
              </h4>
            </div>
            <p>
              Price with discount:{" "}
              <span style={{ color: "#B12704" }}>
                {inddata && inddata.price && inddata.discount > 0
                  ? (
                      inddata.price -
                      (inddata.price * inddata.discount) / 100
                    ).toFixed(2) + " lei"
                  : "You are not lucky this time "}{" "}
              </span>
            </p>
            <p>
              You save:{" "}
              <span style={{ color: "#B12704" }}>
                {inddata && inddata.price && inddata.discount > 0
                  ? (
                      inddata.price -
                      (inddata.price - (inddata.price * inddata.discount) / 100)
                    ).toFixed(2) + " lei"
                  : "You could save on other products"}
              </span>
            </p>
            <Divider />
            <p className="description">
              Color :{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: "16px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                {capitalizeFirstLetter(inddata.color)}
              </span>{" "}
            </p>
            Sizes available
            <div className="size-container">
              {inddata.size &&
                Object.entries(inddata.size)
                  .filter(([sizeKey, sizeValue]) => sizeValue > 0)
                  .map(([sizeKey, sizeValue]) => (
                    <div
                      key={sizeKey}
                      className={`size-tag ${
                        selectedSize === sizeKey ? "selected" : ""
                      }`}
                      onClick={() => handleSizeSelect(sizeKey)}
                    >
                      {sizeKey}
                    </div>
                  ))}
            </div>
            <Divider />
            <p className="description">
              About the Iteam :{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                {inddata.description}
              </span>
            </p>
            <Divider />
            <p className="description">
              Discover This Product:{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: "14px",
                  fontWeight: "500",
                  letterSpacing: "0.4px",
                }}
              >
                No matter the time of day or the event, this clothing item is
                designed to perfectly blend comfort with style, offering
                incredible versatility. With a design meant to complement
                various silhouettes, it's ideal for our model with a height of
                1.82m, a waist of 82cm, and a chest of 102cm, demonstrating the
                exceptional adaptability of our product. Why does this product
                fit so well? Thanks to our attention to detail and a deep
                understanding of body proportions, we've created an article that
                highlights and celebrates the diversity of shapes. The length
                and fit are calibrated to provide a balanced and attractive
                silhouette, regardless of specific measurements.
              </span>
            </p>
          </div>
        </div>
      )}
      {!inddata ? (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
