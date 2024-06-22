import React, { useState, useEffect } from "react";
import "../signup_sign/signup.css";
import axios from "axios"; // Ensure you have axios installed for making HTTP requests
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    id: "",
    code: "",
    url: "", // This will be a File object, not a string URL
    detailUrl: "", // This will also be a File object, not a string URL
    price: 0,
    description: "",
    discount: 0,
    category: "",
    color: "",
    material: "",
    size: {
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
    },
    gender: "",
  });
  const [numberSize, setNumberSize] = useState(0);
  const [productIds, setProductIds] = useState([]);
  const [details, setDetails] = useState({
    material: [],
    color: [],
    category: [],
    gender: [],
  });

  useEffect(() => {
    setProductData((prev) => ({
      ...prev,
      size: {
        XS: numberSize,
        S: numberSize,
        M: numberSize,
        L: numberSize,
        XL: numberSize,
      },
    }));
  }, [numberSize]);

  useEffect(() => {
    fetchElementsData();
  }, []);

  const fetchElementsData = async () => {
    try {
      const response = await fetch("/getelements");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProductIds(data); // Assuming the API returns all product data
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  };

  const handleIdChange = (e) => {
    const selectedId = e.target.value;
    const selectedProduct = productIds.find(
      (product) => product.id === selectedId
    );
    if (selectedProduct) {
      setProductData({ ...productData, id: selectedId });
      setDetails({
        material: selectedProduct.material || [],
        color: selectedProduct.color || [],
        category: selectedProduct.category || [],
        gender: selectedProduct.gender || [],
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberSizeChange = (e) => {
    setNumberSize(e.target.value);
  };

  // Updated to handle file inputs
  const handleFileChange = (e, key) => {
    if (e.target.files.length > 0) {
      setProductData({ ...productData, [key]: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(productData).forEach((key) => {
      if (key === "size") {
        formData.append(key, JSON.stringify(productData[key])); // Convert size object to a JSON string
      } else if (key === "url" || key === "detailUrl") {
        formData.append(key, productData[key]); // Append file objects directly
      } else {
        formData.append(key, productData[key]);
      }
    });

    try {
      const response = await axios.post("/addproduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully");
      console.log("Product added successfully:", response.data);
    } catch (error) {
      toast.error("Failed to add product");
      console.error("There was a problem with your submission:", error);
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_form">
          <form onSubmit={handleSubmit}>
            <h1>
              <center>Add Product</center>
            </h1>
            {/* Dropdown pentru selectarea ID-ului produsului */}
            <div className="form_data">
              <label htmlFor="id">Product ID</label>
              <select
                name="id"
                id="id"
                onChange={handleIdChange}
                value={productData.id}
              >
                <option value="">Select a product ID</option>
                {productIds.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.id}
                  </option>
                ))}
              </select>
            </div>
            <div className="form_data">
              <label htmlFor="code">Code </label>
              <input
                type="text"
                id="code"
                name="code"
                value={productData.code}
                onChange={handleInputChange}
                min="0" // Oprește utilizatorii să introducă valori negative
              />
            </div>
            <div className="form_data">
              <label htmlFor="category">Category</label>
              <select
                name="category"
                id="category"
                onChange={handleInputChange}
                value={productData.category}
              >
                <option value="" disabled hidden>
                  Select category
                </option>
                {details.category.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form_data">
              <label htmlFor="color">Color</label>
              <select
                name="color"
                id="color"
                onChange={handleInputChange}
                value={productData.color}
              >
                <option value="" disabled hidden>
                  Select color
                </option>
                {details.color.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <div className="form_data">
              <label htmlFor="material">Material</label>
              <select
                name="material"
                id="color"
                onChange={handleInputChange}
                value={productData.material}
              >
                <option value="" disabled hidden>
                  Select material
                </option>
                {details.material.map((material) => (
                  <option key={material} value={material}>
                    {material}
                  </option>
                ))}
              </select>
            </div>
            <div className="form_data">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                id="gender"
                onChange={handleInputChange}
                value={productData.gender}
              >
                <option value="" disabled hidden>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form_data">
              <label>Front image</label>
              <label for="url" className="file-upload-label">
                Upload Image URL
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "url")}
                id="url"
              />
            </div>

            {/* Încărcarea imaginii detaliate */}
            <div className="form_data">
              <label>Back Image</label>
              <label for="detailUrl" className="file-upload-label">
                Upload Image DetailUrl
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "detailUrl")}
                id="detailUrl"
              />
            </div>
            <div className="form_data">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                onChange={handleInputChange}
                value={productData.price}
                name="price"
                id="price"
                min="0"
                step="0.01"
              />
            </div>
            <div className="form_data">
              <label htmlFor="discount">Discount</label>
              <input
                type="number"
                onChange={handleInputChange}
                value={productData.discount}
                name="discount"
                id="discount"
                min="0"
                step="0.01"
              />
            </div>
            <div className="form_data">
              <label htmlFor="numberSize">Number Size</label>
              <input
                type="number"
                id="numberSize"
                name="numberSize"
                value={numberSize}
                onChange={handleNumberSizeChange}
                min="0" // Oprește utilizatorii să introducă valori negative
              />
            </div>
            <label htmlFor="description">Description </label>
            <input
              type="text"
              id="description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
              min="0" // Oprește utilizatorii să introducă valori negative
            />
            <button className="signin_btn" type="submit">
              Add Product
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} />
    </section>
  );
};

export default AddProduct;
