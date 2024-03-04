// Import the Product model
const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");


module.exports = {
    // Create a new product
    
    createProduct: async (req, res) => {
        try{
            const decodedJwt = jwt.decode(req.cookies.userToken, { complete: true });
            req.body.userId = decodedJwt.payload._id;
            console.log('createproduct:', req.body);
            const product = await Product.create(req.body);
            res.status(201).json(product);
        }
        catch(err){
            res.status(500).json(err);
        }
        },

        // Retrieve all products
        getAllProducts: async (req, res) => {
            const id = req.params.userId;
            try{
                const products = await Product.find({userId: id}).populate("userId");
                res.status(200).json(products);
            }
            catch(err){
                res.status(500).json(err);
            }
        },
    
    // Retrieve a single Product by its ID
    getOneProduct: (req, res) => {
        Product.findOne({ _id: req.params.id })
        .then((oneProduct) => res.json(oneProduct))
        .catch((err) => res.status(500).json(err));
    },
    
    // Update an existing product by its ID
    updateProduct: (req, res) => {
        Product.findOneAndUpdate(
        { _id: req.params.id },
        {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description
        },
        { new: true, runValidators: true }
        )
        .then((product) => res.json(product))
        .catch((err) => res.status(500).json(err));
    },

    // Delete a product by its ID
    deleteProduct: (req, res) => {
        Product.findOneAndDelete({ _id: req.params.id })
        .then(() => res.json("Product deleted."))
        .catch((err) => res.status(500).json(err));
    },
    }