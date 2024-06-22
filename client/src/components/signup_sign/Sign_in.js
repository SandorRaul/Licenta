import React, { useState, useContext } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";

const Sign_in = (props) => {
  const [logdata, setLogData] = useState({
    email: "",
    password: "",
    userType: "user",
    key: "",
  });

  const { account, setAccount } = useContext(LoginContext);

  const adddata = (e) => {
    const { name, value } = e.target;
    setLogData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const { email, password, userType, key } = logdata;

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        userType,
        key,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      console.log("invalid details ");
      toast.warn("Invalid details", {
        position: "top-center",
      });
    } else {
      console.log("data valid ");
      setAccount(data);

      toast.success("User valid", {
        position: "top-center",
        autoClose: 2000,
      });

      setLogData({ ...logdata, email: "", password: "" });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };

  const handleUserTypeChange = (e) => {
    const userTypeValue = e.target.value;
    setLogData((prevData) => {
      return {
        ...prevData,
        userType: userTypeValue,
      };
    });
  };

  return (
    <>
      <section>
        <div className="sign_container">
          <div className="sign_form">
            <form method="POST">
              <h1 data-testid="cypress-login">Sign In</h1>
              <div className="form_data">
                <label htmlFor="email" data-testid="cypress-email">
                  Email
                </label>
                <input
                  type="text"
                  onChange={adddata}
                  value={logdata.email}
                  name="email"
                  id="email"
                />
              </div>

              <div className="form_data">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  onChange={adddata}
                  value={logdata.password}
                  name="password"
                  id="password"
                />
              </div>
              {logdata.userType === "admin" ? (
                <div className="form_data">
                  <label htmlFor="password">Key</label>
                  <input
                    type="password"
                    placeholder="Key"
                    name="key"
                    id="key"
                    onChange={(e) => adddata(e)}
                  />
                </div>
              ) : null}
              <button className="signin_btn" onClick={senddata}>
                Continue
              </button>
              <div className="grid-container">
                <div className="radio_type">
                  <div className="user-style">
                    <label>
                      <input
                        type="radio"
                        name="userType"
                        value="user"
                        checked={logdata.userType === "user"}
                        onChange={handleUserTypeChange}
                      />
                      User
                    </label>
                  </div>
                  <div className="admin-style">
                    <label>
                      <input
                        type="radio"
                        name="userType"
                        value="admin"
                        checked={logdata.userType === "admin"}
                        onChange={handleUserTypeChange}
                      />
                      Admin
                    </label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="create_accountinfo">
            <p>New To Our WebSite?</p>
            <NavLink to="/register">
              <button>Create Your Account Right Now</button>
            </NavLink>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Sign_in;
