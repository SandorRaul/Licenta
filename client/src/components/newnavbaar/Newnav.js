import React, { useContext, useEffect, useState } from "react";
import "./newnav.css";
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";

const Newnav = () => {
  const { account, setAccount } = useContext(LoginContext);

  useEffect(() => {
    getdetailvaliduser();
  }, []);

  const getdetailvaliduser = async () => {
    const res = await fetch("/validuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    if (res.status !== 201) {
      console.log("Error");
    } else {
      setAccount(data);
    }
  };

  return (
    <div className="new_nav">
      <div className="nav_data">
        <div className="left_data">
          <p>
            <NavLink to="/">All you need</NavLink>
          </p>
          <p>
            <NavLink to={`/getproductsjeans/jeans`}>Jeans</NavLink>
          </p>
          <p>
            <NavLink to={`/getproductst-shirts/t-shirts`}>T-Shirts</NavLink>
          </p>
          <p>
            <NavLink to={`/getproductshoodie/hoodie`}>Hoddies</NavLink>
          </p>
          <p>
            <NavLink to={`/aboutus`}>About Us</NavLink>
          </p>
          <p>
            <NavLink to={`/clientservice`}>Client Services</NavLink>
          </p>
          {account && account.userType === "admin" && (
            <p>
              <NavLink to="/register_admin">Add Admin</NavLink>
            </p>
          )}
          {account && account.userType === "admin" && (
            <p>
              {" "}
              <NavLink to="/addproduct">Add Product</NavLink>
            </p>
          )}
          {account && account.userType === "admin" && (
            <p>
              {" "}
              <NavLink to="/newelement">Create Elements</NavLink>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newnav;
