// Import the ProductController
const ProductController = require("../controllers/product.controller");
const { authenticate } = require('../config/jwt.config');

// Define API routes for Products operations and associate them with corresponding controller methods
module.exports = (app) => {
    app.post("/api/products", authenticate ,ProductController.createProduct);
    app.get("/api/products/:userId", authenticate ,ProductController.getAllProducts);
    app.get("/api/product/:id", authenticate ,ProductController.getOneProduct);
    app.patch("/api/product/edit/:id", authenticate ,ProductController.updateProduct);
    app.delete("/api/product/:id", authenticate ,ProductController.deleteProduct);  
};