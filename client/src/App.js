import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";

import Main from "./Views/Main"; // Main component
import Details from "./Views/Details"; // Details component
import Update from "./Views/Update"; // Update component
// import React from "react";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Chat from "./Components/Chat";

function App() {
  const [socket] = useState(() => io(":8001"));
  const [username, setUsername] = useState("");
  // const [user, setUser] = useState({
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       password: "",
  //       confirmPassword: "",
  //   });
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    console.log("connected");
    socket.on("connect", () => {
      console.log(socket.id);
      setIsConnected(true);
    });

    return () => {
      socket.disconnect(true);
    };
  }, []);
  return (
    <div>
      {/* <h1 className='text-center mb-3'>Login and Register</h1> */}
      <React.StrictMode>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register username={username}
                  setUsername={setUsername}
                  socket={socket}/>} />
        <Route path="/login" element={<Login />} />
        <Route
              path="/chat"
              element={<Chat username={username} socket={socket} />}
            />
        {/* <Route path='/homepage' element={<Homepage/>} /> */}
        {/* Route for the main products view */}
        <Route path="/products" element={<Main />} />

        {/* Route for displaying details of a specific product */}
        <Route path="/product/:id" element={<Details />} />

        {/* Route for editing/updating a specific product */}
        <Route path="/product/edit/:id" element={<Update />} />
      </Routes>
      </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}

export default App;
