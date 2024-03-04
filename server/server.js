const express = require('express');
const cors = require('cors');
const socket = require('socket.io');
const cookieParser = require("cookie-parser");

// Chat App
const chatApp = express();
const chatPort = 8001;

chatApp.use(cors());
const chatServer = chatApp.listen(chatPort, () => {
    console.log(`Chat app is running on port: ${chatPort}`);
});

const chatIo = socket(chatServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
});

let users = [];
let messages = [];

chatIo.on("connection", socket => {
    console.log(socket.id);
    socket.on('joined-server', data => {
        users.push({ name: data, id: socket.id });
        chatIo.emit('new-user', { users: users, messages: messages });
        console.log("serverUsers",users);
    });

    socket.on('send-message', data => {
        messages.push(data);
        chatIo.emit('new-message', messages);
    });

    socket.on('disconnect', () => {
        users = users.filter(user => user.id !== socket.id);
        chatIo.emit('user-disconnected', users);
    });
});

// Product Management App
const app = express();

// Load environment variables from a .env file
require("dotenv").config();

// Set the port for the server to run on, using the environment variable or a default value
const port = process.env.PORT;

// Connect to the MongoDB database using Mongoose
require("./config/mongoose.config");

// Middleware for parsing JSON and URL-encoded data
app.use(express.json(), express.urlencoded({ extended: true }));

// Enable Cross-Origin Resource Sharing (CORS)
// app.use(cors());
app.use(cors({credentials: true, origin:"http://localhost:3000"}))

// Use the cookieParser middleware to parse the cookie header
app.use(cookieParser());

// Import and use the routes defined in the team.routes.js file
const AllMyUserRoutes = require("./routes/user.routes");
AllMyUserRoutes(app);
// Include and configure routes for Product operations
const AllMyProductsRoutes = require("./routes/product.routes");
AllMyProductsRoutes(app);


// Start the server and listen on the specified port
app.listen(port, () => console.log(`Product app is running on port: ${port}`));



// // Import necessary modules
// const express = require("express");
// const app = express();
// const cors = require("cors");
// const cookieParser = require("cookie-parser");

// // Load environment variables from a .env file
// require("dotenv").config();

// // Set the port for the server to run on, using the environment variable or a default value
// const port = process.env.PORT;

// // Connect to the MongoDB database using Mongoose
// require("./config/mongoose.config");

// // Middleware for parsing JSON and URL-encoded data
// app.use(express.json(), express.urlencoded({ extended: true }));

// // Enable Cross-Origin Resource Sharing (CORS)
// // app.use(cors());
// app.use(cors({credentials: true, origin:"http://localhost:3000"}))

// // Use the cookieParser middleware to parse the cookie header
// app.use(cookieParser());

// // Import and use the routes defined in the team.routes.js file
// const AllMyUserRoutes = require("./routes/user.routes");
// AllMyUserRoutes(app);
// // Include and configure routes for Product operations
// const AllMyProductsRoutes = require("./routes/product.routes");
// AllMyProductsRoutes(app);

// // Start the server and listen on the specified port
// app.listen(port, () => console.log(`The server is all fired up on port: ${port}`));

//----------------------------------------------------------------
//----------------------------------------------------------------

