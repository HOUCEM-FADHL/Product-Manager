import { useState, useEffect } from "react";
import {Link} from "react-router-dom";

const Chat = ({ username, socket }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("new-user", (data) => {
      console.log("users:",data.users);
      setUsers(data.users);
      setMessages(data.messages);
    });
    socket.on("new-message", (msgs) => {
      console.log(msgs);
      setMessages(msgs);
    });
  }, [socket]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send-message", { username, msg: input });
    setInput("");
  };
  return (
    <div style={{textAlign:"center" }}>
      <h1>Chat with any of these users</h1>
      <Link to="/products">Products</Link>
      <ul style={{listStyle:"none"}}>
        {users.map((user, i) => (
          <li key={i}>{user.name}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Send</button>
      </form>
      <div style={{backgroundColor:"lightgray", padding:"10px" , marginTop:"10px"}}>
      {messages.map((msg, i) => (
        <p key={i}>
          <span style={{color:"green"}}>{msg.username}</span> says: <span style={{backgroundColor:"green", color:"white"}}>{msg.msg}</span>
        </p>
      ))}
      </div>
    </div>
  );
};

export default Chat;
