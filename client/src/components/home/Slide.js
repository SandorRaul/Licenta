import React from "react";
import { Divider } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";
import "./slide.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Slide = ({ title, products, type }) => {
  const filteredProducts = products.filter((product) => {
    if (type === "discount") {
      return product.discount > 0;
    }
    return type ? product.gender === type : true;
  });

  return (
    <div className="products_section">
      <div className="products_deal">
        <h3>{title}</h3>
      </div>

      <Divider />

      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={true}
        showDots={false}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {filteredProducts.map((product) => (
          <NavLink to={`/getproductsoneclothes/${product.code}`}>
            <div className="products_items">
              <div className="products_img">
                <img src={product.detailUrl} alt="product item" />
              </div>
              <p className="products_name">{product.title.longTitle}</p>
              <p className="products_offer">Check it!</p>
            </div>
          </NavLink>
        ))}
      </Carousel>
    </div>
  );
};

export default Slide;
