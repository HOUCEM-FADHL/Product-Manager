// Importing necessary dependencies
import React from 'react';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// EditButton component definition
const EditButton = (props) => {
    // Destructuring props to extract the 'id' parameter
    const { id } = props;

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // Function to navigate to the edit page for a specific product
    const editProduct = (id) => {
        navigate(`/product/edit/${id}`);
    };

    // Rendering the EditButton component
    return (
        <div>
            {/* Edit button with Bootstrap styling */}
            <Button
                variant="outline-success" // Variant for the button style
                size="sm" // Size of the button (small)
                className="ml-3" // Margin left for spacing
                onClick={() => editProduct(id)} // Click event handler to trigger the navigation
            >
                Edit
            </Button>
        </div>
    );
}

// Exporting the EditButton component as the default export
export default EditButton;
