// Importing necessary dependencies
import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

// DeleteButton component definition
const DeleteButton = (props) => {
    // Destructuring props to extract the 'id' and 'successCallback' parameters
    const { id, successCallback } = props;

    // Function to delete a product
    const deleteProduct = (e) => {
        // Logging the id for debugging purposes
        console.log(id);

        // Making a DELETE request to delete the product by id
        axios
            .delete(`http://localhost:8000/api/product/${id}`, { withCredentials: true })
            .then((res) => {
                // Successful response from the server
                // Log the response data
                console.log("res delete product:", res);
                console.log("res.data delete product:", res.data);
                // Execute the successCallback function provided by the parent component
                successCallback();
            })
            .catch((err) => console.log(err));
    };

    // Rendering the DeleteButton component
    return (
        <div>
            {/* Delete button with Bootstrap styling */}
            <Button
                variant="outline-dark" // Variant for the button style
                size="sm" // Size of the button (small)
                className="ml-3" // Margin left for spacing
                onClick={deleteProduct} // Click event handler to trigger the deletion
            >
                Delete
            </Button>
        </div>
    );
};

// Exporting the DeleteButton component as the default export
export default DeleteButton;
