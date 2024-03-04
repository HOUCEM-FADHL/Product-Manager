// Importing necessary dependencies
import React, { useEffect, useState } from "react";
import axios from "axios"; // Importing Axios for making HTTP requests
import { useParams, useNavigate } from "react-router-dom"; // Importing useParams and useNavigate for handling route parameters and navigation
import DeleteButton from "../Components/DeleteButton"; // Importing DeleteButton component
import EditButton from "../Components/EditButton"; // Importing EditButton component

// Details component definition
const Details = () => {
    // State for managing the details of a single product
    const [product, setProduct] = useState({});

    // Extracting the 'id' parameter from the route
    const { id } = useParams();

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // useEffect hook to fetch details of the product when the component mounts
    useEffect(() => {
        console.log("id-details:", id);
        axios
        .get(`http://localhost:8000/api/product/${id}`, { withCredentials: true })
        .then((res) => {
            // Successful response from the server
            console.log("res.data one product:", res.data);
            // Set the product details to the state variable
            setProduct(res.data);
        })
        .catch((err) => console.log(err));
    }, [id]); // Dependency array to run the effect only when 'id' changes

    // Rendering the product details
    return (
        <div className="container w-50 mx-auto text-center">
        <h3 className="m-3">{product.title}</h3>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>

        {/* Container for edit and delete buttons */}
        <div className="d-flex justify-content-center">
            {/* EditButton component with the product's _id as a prop */}
            <EditButton id={product._id} />
            {/* DeleteButton component with the product's _id and a successCallback to navigate back to the products page */}
            <DeleteButton
            id={product._id}
            successCallback={() => navigate("/products")}
            />
        </div>
        </div>
    );
};

// Exporting the Details component as the default export
export default Details;

