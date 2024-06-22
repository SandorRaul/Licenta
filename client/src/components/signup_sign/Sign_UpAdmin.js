import React, { useState, useContext, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";

const SIgnUpAdmin = () => {
  const generatePassword = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";

    let password = "";

    for (let i = 0; i < 2; i++) {
      password += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    for (let i = 0; i < 6; i++) {
      password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return password;
  };

  const { account, setAccount } = useContext(LoginContext);

  useEffect(() => {
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
      if (res.status === 201) {
        setAccount(data);
      } else {
        console.log("Error");
      }
    };

    getdetailvaliduser();
  }, []);

  const [udata, setUdata] = useState({
    fname: "",
    cnp: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
    key: "",
    usertype: "admin",
  });

  const adddata = (e) => {
    const { name, value } = e.target;
    setUdata((prevUdata) => {
      const updatedUdata = { ...prevUdata, [name]: value };
      if (name === "cnp" && value.length === 13) {
        updatedUdata.key = value.slice(-6);
      }
      return updatedUdata;
    });
  };

  const senddata = async (e) => {
    e.preventDefault();
    const newPassword = generatePassword();
    const finalData = {
      ...udata,
      password: newPassword,
      cpassword: newPassword,
    };

    const res = await fetch("/register_admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalData),
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.warn("Invalid details", { position: "top-center" });
    } else {
      toast.success("Admin successfully added", { position: "top-center" });
      setUdata({ ...udata, fname: "", cnp: "", email: "", mobile: "" });
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_form">
          <form method="POST">
            <h1 style={{ textAlign: "center" }}>Add admin</h1>
            <div className="form_data">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.fname}
                name="fname"
                id="fname"
              />
            </div>
            <div className="form_data">
              <label htmlFor="cnp">CNP</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.cnp}
                name="cnp"
                id="cnp"
                maxLength={13}
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.email}
                name="email"
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                onChange={adddata}
                value={udata.mobile}
                name="mobile"
                id="mobile"
              />
            </div>
            <button className="signin_btn" onClick={senddata}>
              Create Admin
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default SIgnUpAdmin;
