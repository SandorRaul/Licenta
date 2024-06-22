import React, { useState } from "react";
import "../signup_sign/signup.css";
import { ToastContainer, toast } from "react-toastify"; // Import the necessary components
import "react-toastify/dist/ReactToastify.css"; // Import default styles

const AddElement = () => {
  // Define state variables for form fields
  const [type, setType] = useState("jeans"); // Default value as 'jeans'
  const [feature, setfeature] = useState("category"); // Default value as 'category'
  const [newOne, setNewOne] = useState(""); // Initial empty value

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submit action

    // Data to be sent to the API
    const formData = {
      type,
      feature,
      newOne,
    };

    try {
      // Send a POST request to the backend API
      const response = await fetch("/addelement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Convert the formData object into a JSON string
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result); // Process the response from the server
        toast.success("Successfully added!", {
          position: "top-center",
        }); // Display a success toast
      } else {
        // Handle server errors or invalid responses
        toast.error("Failed to add the element.", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the element.", {
        position: "top-center",
      });
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_form">
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Add handleSubmit to the form's onSubmit event */}
            <h1>
              <center>Create Element</center>
            </h1>
            <div className="form_data">
              <label htmlFor="type">Id</label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="jeans">Jeans</option>
                <option value="hoodie">Hoodie</option>
                <option value="t-shirts">T-Shirts</option>
              </select>
            </div>
            <div className="form_data">
              <label htmlFor="category">Type</label>
              <select
                id="feature"
                name="feature"
                value={feature}
                onChange={(e) => setfeature(e.target.value)}
              >
                <option value="category">Category</option>
                <option value="color">Color</option>
                <option value="gender">Gender</option>
                <option value="material">Material</option>
              </select>
            </div>
            <div className="form_data">
              <label htmlFor="newOne">New One</label>
              <input
                type="text"
                id="newOne"
                name="newOne"
                value={newOne}
                onChange={(e) => setNewOne(e.target.value)}
                min="0"
              />
            </div>
            <button className="signin_btn" type="submit">
              Add it !
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddElement;
