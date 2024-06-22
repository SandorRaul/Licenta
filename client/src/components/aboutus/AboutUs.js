import React from "react";
import "./aboutus.css";

const AboutUs = () => {
  return (
    <section>
      <div className="aboutUsContainer">
        <h1 className="aboutUsTitle">About Us</h1>
        <p className="aboutUsParagraph">
          We are passionate about fashion and offer the latest trends in
          clothing. Our team works tirelessly to select garments that enhance
          your personality and unique style.
        </p>
        <img
          src="./polo_1.jpg"
          className="aboutUsImage"
          alt="Best Collection"
        />

        <h2 className="aboutUsTitle">Our Mission</h2>
        <p className="aboutUsParagraph">
          We aim to provide a unique experience to each customer through
          high-quality products, exceptional service, and a personalized
          approach. We believe that fashion is a form of expressing
          individuality, and we are dedicated to helping you express yourself
          through the clothes you wear.
        </p>
        <img src="./hanorac.jpeg" className="aboutUsImage" alt="rightimg" />
        <img src="./polo_2.jpeg" className="aboutUsImage" alt="rightimg" />
        <h2 className="aboutUsTitle">Our Vision</h2>
        <p className="aboutUsParagraph">
          We aim to be leaders in the fashion market, recognized for the
          diversity and quality of our products. Our vision is to inspire and
          motivate people to express their personality and unique style every
          day. We believe in creating a sustainable future for fashion by
          embracing eco-friendly practices and materials that minimize our
          environmental impact. Our goal is to not only dress individuals in the
          latest trends but also to make a positive difference in the community
          and the world. We envision a world where fashion is a force for good,
          empowering individuals, supporting communities, and preserving our
          planet for future generations. By fostering a culture of innovation,
          inclusion, and responsibility, we strive to redefine what it means to
          be a fashion brand in the 21st century.
        </p>
        <img src="./future1.jpeg" className="aboutUsImage" alt="rightimg" />
        <img src="./future2.jpeg" className="aboutUsImage" alt="rightimg" />
      </div>
    </section>
  );
};

export default AboutUs;
