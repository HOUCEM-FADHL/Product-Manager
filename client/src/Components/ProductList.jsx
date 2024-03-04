// Importing necessary dependencies
import React from "react";
// import axios from "axios"; // Importing Axios for making HTTP requests
import { Link } from "react-router-dom"; // Importing Link for navigation
import DeleteButton from "./DeleteButton"; // Importing DeleteButton component
import EditButton from "./EditButton"; // Importing EditButton component

// ProductList component definition
const ProductList = (props) => {
    // Destructuring props to extract products and setProducts
    const { products, setProducts } = props;

    // Function to remove a product from the list
    const removeProduct = (id) => {
        setProducts(products.filter((product) => product._id !== id));
    };

    // Rendering the ProductList component
    return (
        <div className="mb-5">
        {/* Heading for the list of products */}
        <h2 className="mt-3">All Products</h2>
        {/* Mapping through the products and rendering each product */}
        {products.map((product) => (
            <div
            key={product._id} // Using the product's _id as the key
            className="container d-flex justify-content-between align-items-center"
            >
            {/* Link to navigate to the details page of the product */}
            <Link to={`/product/${product._id}`}>{product.title}</Link>
            {/* Container for edit and delete buttons */}
            <div className="d-flex">
                {/* EditButton component with the product's _id as a prop */}
                <EditButton id={product._id} />
                {/* DeleteButton component with the product's _id and a successCallback to update the list */}
                <DeleteButton id={product._id} successCallback={() => removeProduct(product._id)} />
            </div>
            </div>
        ))}
        </div>
    );
};

// Exporting the ProductList component as the default export
export default ProductList;


