// Importing necessary dependencies
import React, { useEffect, useState } from "react";
import ProductForm from "../Components/ProductForm"; // Importing ProductForm component
import ProductList from "../Components/ProductList"; // Importing ProductList component
import axios from "axios"; // Importing Axios for making HTTP requests

import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";

// Main component definition
const Main = (props) => {
  // State for managing the list of products and errors
  const [products, setProducts] = useState([]); // State for products
  const [error, setError] = useState({}); // State for errors during form submission
  const [authenticated, setAuthenticated] = useState(false); // State for authentication status
  //---------------------------------------------------
  const navigate = useNavigate();
  const idx = window.localStorage.getItem('userId');


  useEffect(() => {
    console.log("idx", idx);
    axios
      .get(`http://localhost:8000/api/products/${idx}`, { withCredentials: true })
      .then((res) => {
        // Successful response from the server
        console.log("res.data List", res.data);
        setAuthenticated(true);
        setProducts(res.data);
      })
      .catch((err) => {
        setAuthenticated(false);
        console.log("err msg", err.response.data);
      });
  }, [idx]);

  const logoutUser = () => {
    axios
      .post(
        "http://localhost:8000/api/logoutUser",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        navigate("/");
        window.localStorage.removeItem('userId');
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //---------------------------------------------------
  // Function to create a new product
  const createProduct = (title, price, description) => {
    // Making a POST request to the server to create a new product
    axios
      .post(
        `http://localhost:8000/api/products`,
        {
          title,
          price,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        // Successful response from the server
        console.log("res form", res);
        console.log("res.data form", res.data);
        // Updating the products state with the newly created product
        setProducts([...products, res.data]);
        // Clearing any previous errors
        setError({});
      })
      .catch((err) => {
        // Error response from the server
        console.log(err.response.data.errors);
        // Updating the error state with the validation errors from the server
        setError(err.response.data.errors);
      });
  };

  // Rendering the main component
  return (
    <div className="container w-50 mx-auto text-center">
      {authenticated && (
        <div>
          <p>You logged In</p>
          {/* <p>Hello {loggedInUser.firstName}</p> */}
          <Button onClick={logoutUser}>Logout</Button>
          <Link to={"/Chat"}>Chat</Link>
          {/* Heading for the Product Manager */}
          <h1 className="m-3">Product Manager</h1>

          {/* ProductForm component for adding new products */}
          <ProductForm
            onSubmitProps={createProduct} // Passing the createProduct function as a prop
            initialTitle="" // Initial value for the product title
            initialPrice={1} // Initial value for the product price
            initialDescription="" // Initial value for the product description
            error={error} // Passing the error state as a prop for displaying validation errors
            formMode="create"
          />
          {/* ProductList component for displaying the list of products */}
          <ProductList products={products} setProducts={setProducts}  />
        </div>
      )}
      {!authenticated && (
        <p>
          You are not logged in<Link to="/login">Login here</Link>
        </p>
      )}
    </div>
  );
};

// Exporting the Main component as the default export
export default Main;
