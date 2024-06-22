import "./App.css";
import Navbaar from "./components/header/Navbaar";
import Newnav from "./components/newnavbaar/Newnav";
import Maincomp from "./components/home/Maincomp";
import Footer from "./components/footer/Footer";
import Sign_in from "./components/signup_sign/Sign_in";
import SIgnUp from "./components/signup_sign/SIgnUp";
import SIgnUpAdmin from "./components/signup_sign/Sign_UpAdmin";
import Cart from "./components/cart/Cart";
import Buynow from "./components/buynow/Buynow";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import Jeans from "./components/clothes/Jeans";
import Sweat from "./components/clothes/Sweat";
import Tshirts from "./components/clothes/Tshirts";
import Pay from "./components/payment/Pay";
import AddProduct from "./components/addproduct/AddProduct";
import AboutUs from "./components/aboutus/AboutUs";
import AddElement from "./components/addproduct/AddElement";
import Clientservices from "./components/clientservice/Clientservices";
function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  });

  return (
    <>
      {data ? (
        <>
          <Navbaar />
          <Newnav />
          <Routes>
            <Route path="/" element={<Maincomp />} />
            <Route path="/login" element={<Sign_in />} />
            <Route path="/register" element={<SIgnUp />} />
            <Route path="/getproductsone/:code" element={<Cart />} />
            <Route path="/getproductsoneclothes/:code" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
            <Route path="/register_admin" element={<SIgnUpAdmin />} />
            <Route path="/getproductsjeans/:id" element={<Jeans />} />
            <Route path="/getproductst-shirts/:id" element={<Tshirts />} />
            <Route path="/getproductshoodie/:id" element={<Sweat />} />
            <Route path="/pay" element={<Pay />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/newelement" element={<AddElement />} />
            <Route path="/clientservice" element={<Clientservices />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default App;

//A>B>C>D
//A -> props
//store 5 userdata
