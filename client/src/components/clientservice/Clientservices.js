import React, { useState, useContext } from "react";
import "./clientservices.css";
import ContextProvider, { LoginContext } from "../context/ContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function ClientServices() {
  const { account, setAccount } = useContext(LoginContext);
  const [formData, setFormData] = useState({
    orderNumber: "",
    message: "",
  });
  const userId = account ? account._id : "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account) {
      toast.warn("Please log in to submit the form.", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }
    if (!formData.orderNumber.trim() || !formData.message.trim()) {
      toast.warn("Please fill in all the fields.", {
        position: "top-center",
        autoClose: 5000,
      });
      return;
    }
    const dataToSend = {
      ...formData,
      userId: userId,
    };
    try {
      const response = await fetch("/clientservice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with the request.");
      }

      const data = await response.json();
      console.log(data);
      toast.success("Form submitted successfully!", {
        position: "top-center",
        autoClose: 5000,
      });

      setFormData({
        orderNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit the form:", error);
      toast.error("Failed to submit the form. Please try again later.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  return (
    <section>
      <div className="content-container">
        <div className="story-section">
          <h2>Welcome to Our Site!</h2>
          <p>
            We're dedicated to providing you with the resources you need to
            excel. Your success is our priority. Let's embark on this journey
            together.
          </p>
        </div>
        <section className="form-container">
          <div className="form">
            <h2 className="form-title">Contact Customer Service</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-field">
                <label>Number of Order:</label>
                <input
                  type="text"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="form-field">
                <label>Message:</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="form-button">
                Send
              </button>
            </form>
          </div>
        </section>

        <div className="helpful-info">
          <h3>Need More Help?</h3>
          <p>
            If you have any questions or need further assistance, please don't
            hesitate to contact us.
          </p>
          <p>
            Email us at{" "}
            <a href="mailto:voguemagazine@gmail.com" className="email-link">
              voguemagazine@gmail.com
            </a>
          </p>
        </div>
      </div>{" "}
    </section>
  );
}

export default ClientServices;
