// Importing necessary dependencies from react-bootstrap
import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

// ProductForm component definition
const ProductForm = (props) => {
    // Destructuring props to extract necessary properties
    const {
        onSubmitProps,
        initialTitle,
        initialPrice,
        initialDescription,
        error,
        formMode // New prop to indicate the form mode (create or update)
    } = props;

    // State for managing form input values
    const [title, setTitle] = useState(initialTitle);
    const [price, setPrice] = useState(initialPrice);
    const [description, setDescription] = useState(initialDescription);
    // Define the text for the submit button based on the form mode

    const formButtonText = formMode === "update"? "Update" : "Create";

    // Form submission handler
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // Calling the onSubmitProps function with form input values
        onSubmitProps(title, price, description);

        // Resetting form input values to initial state
        setTitle(initialTitle);
        setPrice(initialPrice);
        setDescription(initialDescription);
    };

    // Render the form with Bootstrap components
    return (
        <div>
        <form onSubmit={onSubmitHandler}>
            {/* Title input field */}
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
                Title:
            </Form.Label>
            <Col sm="10">
                <Form.Control
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                />
            </Col>
            </Form.Group>
            {/* Display an error message if there is an error for the title */}
            {error.title ? <p className="text-danger">{error.title.message}</p> : null}
            
            {/* Price input field */}
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
                Price:
            </Form.Label>
            <Col sm="10">
                <Form.Control
                value={price}
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                />
            </Col>
            </Form.Group>
            {/* Display an error message if there is an error for the price */}
            {error.price ? <p className="text-danger">{error.price.message}</p> : null}
            
            {/* Description input field */}
            <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
                Description:
            </Form.Label>
            <Col sm="10">
                <Form.Control
                value={description}
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                />
            </Col>
            </Form.Group>
            {/* Display an error message if there is an error for the description */}
            {error.description ? (
            <p className="text-danger">{error.description.message}</p>
            ) : null}
            
            {/* Submit button with dynamic text based on form mode */}
            <Button type="submit">{formButtonText}</Button>
        </form>
        </div>
    );
};

// Exporting the ProductForm component as the default export
export default ProductForm;


