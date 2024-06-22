import React from "react";
import "./footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="footr_details_one">
          <h3>Get to Know us</h3>
          <p>About us</p>
          <p>voguemagazine@gmail.com</p>
          <p>Press Releases</p>
        </div>
        <div className="footr_details_one forres">
          <h3>Connect With us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className="footr_details_one forres">
          <h3>Make Money with Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className="footr_details_one">
          <h3>Make Money with Us</h3>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </div>
      <div className="lastdetails">
        <p>
          Conditions of Use & Sale &nbsp; &nbsp;&nbsp; Privacy Notice &nbsp;
          &nbsp;&nbsp; Make you shine &nbsp; &nbsp;&nbsp;{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
