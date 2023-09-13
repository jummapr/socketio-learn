import React from "react";
import "./message.css";

const Message = ({ message, classes, user }) => {
  if (user) {
    return <div className={`messageBox ${classes}`}>{`${user}: ${message}`}</div>;
  } else {
    return <div className={`messageBox ${classes}`}>{`you: ${message}`}</div>;
  }
};

export default Message;
