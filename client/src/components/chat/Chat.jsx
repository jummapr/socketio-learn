import React, { useEffect, useState } from "react";
import closeIcon from "../../assets/closeIcon.png";
import "./chat.css";
import { users } from "../Join/Join";
import socketIo from "socket.io-client";
import sendLogo from "../../assets/send.png";
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "http://localhost:4000/";

const Chat = () => {
  const [id, setId] = useState("");
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState([]);
  const send = () => {
    const message = document.getElementById("chatInput").value;

    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      console.log("Connected to server");
      setId(socket.id);
    });

    console.log(socket);
    socket.emit("joined", { users });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on("UserJoined", (data) => {
        setMessages([...messages, data]);
      console.log(data);
    });

    socket.on("leave", (data) => {
      console.log(data);
    });

    return () => {
      socket.emit("disconnected");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      console.log("Message: ", data.message);
      console.log("User: ", data.user);
      setMessages([...messages, data]);
      setUser((prev) => [...prev, data.user]);
    });

    return () => {
        socket.off();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>C CHAT</h2>
          <a href="/">
            {" "}
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message message={item.message} key={i} classes={item.id === id ? "right" : "left"} user={item.id  === id ? "" : item.user} />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input onKeyDown={(event) => event.key === "Enter" ? send() : null} type="text" id="chatInput" placeholder="Type a message" />
          <button onClick={send} className="sendBtn">
            <img src={sendLogo} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
