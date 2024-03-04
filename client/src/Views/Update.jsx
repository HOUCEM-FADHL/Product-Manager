// Importing necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios"; // Importing Axios for making HTTP requests
import { useNavigate, useParams } from "react-router-dom"; // Importing useNavigate and useParams for handling route parameters and navigation
import ProductForm from "../Components/ProductForm"; // Importing ProductForm component

// Update component definition
const Update = (props) => {
    // Extracting the 'id' parameter from the route
    const { id } = useParams();

    // State for managing the product details, errors, and loading status
    const [product, setProduct] = useState({});
    const [error, setError] = useState({});
    const [loaded, setLoaded] = useState(false);

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // useEffect hook to fetch details of the product when the component mounts
    useEffect(() => {
        axios
        .get(`http://localhost:8000/api/product/${id}`, { withCredentials: true })
        .then((res) => {
            // Successful response from the server
            setProduct(res.data);
            setLoaded(true);
        })
        .catch((err) => console.log(err));
    }, [id]); // Dependency array to run the effect only when 'id' changes

    // Function to update a product
    const updateProduct = (title, price, description) => {
        axios
        .patch(`http://localhost:8000/api/product/edit/${id}`, {
            title,
            price,
            description,
        }, { withCredentials: true })
        .then((res) => {
            // Successful response from the server after updating the product
            console.log("updated data: ", res.data);
            // Navigate back to the products page
            navigate("/products");
            // Clearing any previous errors
            setError({});
            // Resetting the loaded status to false
            setLoaded(false);
        })
        .catch((err) => {
            // Error response from the server
            console.log(err);
            // Updating the error state with validation errors
            setError(err.response.data.errors);
        });
    };

    // Rendering the Update component
    return (
        <div className="container w-50 mx-auto text-center">
        <h1>Update a Product</h1>
        {/* Displaying the ProductForm component when the product details are loaded */}
        {loaded && (
            <ProductForm
            onSubmitProps={updateProduct}
            initialTitle={product.title}
            initialPrice={product.price}
            initialDescription={product.description}
            error={error}
            formMode="update"
            />
        )}
        </div>
    );
};

// Exporting the Update component as the default export
export default Update;
