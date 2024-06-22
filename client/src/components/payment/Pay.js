import React, { useEffect, useState, useContext } from "react";
import "../signup_sign/signup.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";

const Pay = () => {
  const [paymentData, setPaymentData] = useState({
    fname: "",
    mobile: "",
    address: "",
    county: "",
    postalCode: "",
    details: "",
    paymentMethod: "cash",
    cardDetails: {
      ownerName: "",
      cardNumber: "",
      cvv: "",
      expDate: "",
    },
  });

  const { account, setAccount } = useContext(LoginContext);
  const navigate = useNavigate();
  const [cartdata, setCartdata] = useState([]);
  const [availableCodes, setAvailableCodes] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  console.log(cartdata);
  console.log("Ce am : ", availableCodes);
  console.log("Ce cumpar : ", availableProducts);

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
      setCartdata(data.buyuser.carts || []); // Actualizat pentru a seta cartdata bazat pe structura noua a raspunsului
      setAvailableCodes(data.availableProductsCodes || []); // Seteaza codurile produselor disponibile
    }
  };
  useEffect(() => {
    getdatabuy();
  }, []);
  useEffect(() => {
    // Filtram cartdata pentru a obtine doar produsele ale caror coduri sunt în availableCodes
    const filteredProducts = cartdata.filter((product) =>
      availableCodes.includes(product.code)
    );
    setAvailableProducts(filteredProducts);
  }, [cartdata, availableCodes]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      if (value === "" || (/^\d+$/.test(value) && value.length <= 16)) {
        setPaymentData((prevState) => ({
          ...prevState,
          cardDetails: {
            ...prevState.cardDetails,
            cardNumber: value,
          },
        }));
      }
    } else if (name === "cvv") {
      if (value === "" || (/^\d+$/.test(value) && value.length <= 3)) {
        setPaymentData((prevState) => ({
          ...prevState,
          cardDetails: {
            ...prevState.cardDetails,
            cvv: value,
          },
        }));
      }
    } else if (name === "expDate") {
      const expDateRegex = /^(\d{0,2})\/?(\d{0,2})$/;
      let matches = value.match(expDateRegex);
      if (matches) {
        let formattedValue = matches[1] + (matches[2] ? "/" + matches[2] : "");
        setPaymentData((prevState) => ({
          ...prevState,
          cardDetails: {
            ...prevState.cardDetails,
            expDate: formattedValue,
          },
        }));
      }
    } else {
      setPaymentData((prevState) => ({
        ...prevState,
        cardDetails: ["ownerName"].includes(name)
          ? {
              ...prevState.cardDetails,
              [name]: value,
            }
          : prevState.cardDetails,
        ...(!["ownerName"].includes(name) && { [name]: value }),
      }));
    }
  };

  const handlePaymentMethodClick = (method) => {
    setPaymentData((prevState) => {
      if (method === "cash") {
        return {
          ...prevState,
          paymentMethod: method,
          cardDetails: {
            ownerName: "",
            cardNumber: "",
            cvv: "",
            expDate: "",
          },
        };
      } else {
        return {
          ...prevState,
          paymentMethod: method,
        };
      }
    });
  };

  const removedata = async (req, res) => {
    try {
      const res = await fetch(`/removeall/${availableCodes}`, {
        method: "DELETE",
        headers: {
          Aceept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (res.status === 400) {
        console.log("error");
      } else {
        console.log("user delete ");
        setAccount(data);
      }
    } catch (error) {
      console.log("error");
    }
  };
  const decrementStock = async () => {
    try {
      const response = await fetch("/decrement-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ availableProducts }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Stock updated successfully:", data);
        toast.success("Stock updated successfully!");
      } else {
        console.log("Failed to update stock:", data.message);
        toast.error(`Failed to update stock: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      toast.error("An error occurred while updating stock.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = account ? account._id : "";
    const email = account ? account.email : "";
    let dataToSubmit = {
      userId,
      fname: paymentData.fname,
      email: email,
      mobile: paymentData.mobile,
      address: paymentData.address,
      county: paymentData.county,
      postalCode: paymentData.postalCode,
      details: paymentData.details,
      typeOfPayment: paymentData.paymentMethod,
      cardDetails: paymentData.cardDetails,
      availableProducts,
    };

    const isFormValid =
      dataToSubmit.fname &&
      dataToSubmit.mobile &&
      dataToSubmit.address &&
      dataToSubmit.county &&
      dataToSubmit.postalCode;

    // Validare pentru Visa
    const isVisaValid =
      paymentData.paymentMethod === "visa" &&
      paymentData.cardDetails.cvv.length === 3 &&
      paymentData.cardDetails.cardNumber.length === 16 &&
      /^\d{2}\/\d{2}$/.test(paymentData.cardDetails.expDate);

    if (
      (paymentData.paymentMethod === "cash" && isFormValid) ||
      (paymentData.paymentMethod === "visa" && isFormValid && isVisaValid)
    ) {
      try {
        const response = await fetch("/createpayment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        });

        if (response.ok) {
          await removedata();
          await decrementStock();
          toast.success("Payment successfully processed!", {
            position: "top-center",
          });
          navigate("/"); // homepage
        } else {
          toast.error("An error occurred while processing your payment.");
        }
      } catch (error) {
        console.error("Failed to submit payment:", error);
        toast.error("Failed to process your payment.", {
          position: "top-center",
        });
      }
    } else {
      if (!isFormValid) {
        toast.error("Please fill all the required fields.", {
          position: "top-center",
        });
      } else if (paymentData.paymentMethod === "visa" && !isVisaValid) {
        toast.error("Please check your card details and try again.", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_form">
          <form onSubmit={handleSubmit}>
            <h1>
              <center>Place order</center>
            </h1>

            {/* Nume utilizator */}
            <div className="form_data">
              <label htmlFor="fname">Your name</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={paymentData.fname}
                name="fname"
                id="fname"
              />
            </div>
            {/* Număr de telefon */}
            <div className="form_data">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={paymentData.mobile}
                name="mobile"
                id="mobile"
              />
            </div>

            {/* Adresă */}
            <div className="form_data">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={paymentData.address}
                name="address"
                id="address"
              />
            </div>

            {/* Județ/Regiune */}
            <div className="form_data">
              <label htmlFor="county">County/Region</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={paymentData.county}
                name="county"
                id="county"
              />
            </div>

            {/* Cod Poștal */}
            <div className="form_data">
              <label htmlFor="postalCode">Postal code</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={paymentData.postalCode}
                name="postalCode"
                id="postalCode"
              />
            </div>

            <div className="form_data">
              <label htmlFor="details">Details (Optional)</label>
              <input
                type="text"
                onChange={handleInputChange}
                value={paymentData.details}
                name="details"
                id="details"
                placeholder="Not mandatory"
              />
            </div>

            <div>
              <label>Select payment method :</label>
              <div className="payment_buttons_container">
                <button
                  type="button"
                  className={`payment_button visa_button ${
                    paymentData.paymentMethod === "visa" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodClick("visa")}
                >
                  <img src="./visa.jpg" alt="Cash on Delivery" />
                </button>
                <button
                  type="button"
                  className={`payment_button cod_button ${
                    paymentData.paymentMethod === "cash" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodClick("cash")}
                >
                  <img src="./cash-on-delivery.jpg" alt="Cash on Delivery" />
                </button>
              </div>
            </div>

            {paymentData.paymentMethod === "visa" && (
              <React.Fragment>
                <div className="form_data">
                  <label htmlFor="ownerName">Name of Owner</label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    value={paymentData.cardDetails.ownerName}
                    name="ownerName"
                    id="ownerName"
                  />
                </div>
                <div className="form_data">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    value={paymentData.cardDetails.cardNumber}
                    name="cardNumber"
                    id="cardNumber"
                    maxLength="16"
                    placeholder="ex: 4140 4122 4233 4150"
                  />
                </div>
                <div className="form_data">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    value={paymentData.cardDetails.cvv}
                    name="cvv"
                    id="cvv"
                    maxLength="3"
                    placeholder="CVV"
                  />
                </div>
                <div className="form_data">
                  <label htmlFor="expDate">Expiry Date</label>
                  <input
                    type="text"
                    onChange={handleInputChange}
                    value={paymentData.cardDetails.expDate}
                    name="expDate"
                    id="expDate"
                    maxLength="5"
                    placeholder="MM/YY"
                  />
                </div>
              </React.Fragment>
            )}

            <button className="signin_btn" type="submit">
              Order
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Pay;
