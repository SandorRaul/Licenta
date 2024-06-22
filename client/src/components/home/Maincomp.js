import React, { useEffect } from "react";
import Banner from "./Banner";
import "../home/home.css";
import Slide from "./Slide";
import { Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getProductsclothes } from "../redux/actions/actionclothes";
import { NavLink } from "react-router-dom";

const Maincomp = () => {
  const clothes = useSelector((state) => state.clothes.productsclothes);
  console.log(clothes);
  console.log("-------------------------------------------------------");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsclothes());
  }, [dispatch]);

  return (
    <>
      <div className="home_section">
        <div className="banner_part">
          <Banner />
        </div>
        <div className="slide_part">
          <div className="left_slide">
            <Slide
              title="Deal Of The Day for everyone"
              products={clothes}
              type=""
            />
          </div>
          <div className="right_slide">
            <h4 data-testid="cypress-comercial">Perfect Style</h4>
            <img src="./jeans2.jpeg" alt="rightimg" />
            <NavLink to={`/getproductsjeans/jeans`}>Check it!</NavLink>
          </div>
        </div>

        <Slide
          title="Today's Deal of the clothes for men's "
          products={clothes}
          type="male"
        />

        <div className="center_img">
          <img src="/mixed.jpeg" alt="" />
        </div>

        <Slide
          title="Today's Deal of the clothes for women"
          products={clothes}
          type="female"
        />
        <Slide title="Upto 80% off" products={clothes} type="discount" />
      </div>

      <Divider />
    </>
  );
};

export default Maincomp;
