// Import the mongoose library
const mongoose = require("mongoose");

// Define the schema for the Product model
const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be at least 1 dollar"],
      max: [10000, "Price must be less than 10000 dollars"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
    },
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
  }
  }, { timestamps: true });

// Create the Product model using the defined schema
const Product = mongoose.model("Product", ProductSchema);

// Export the Product model
module.exports = Product;
