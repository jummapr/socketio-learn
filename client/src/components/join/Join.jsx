import React, { useState } from "react";
import "./join.css";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

let users;

const sendUsers = () => {
  users = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};
const Join = () => {
    const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={Logo} alt="" />
        <h1>Join Page</h1>
        <input onChange={(e) => setName(e.target.value)} value={name} type="text" id="joinInput" placeholder="Enter your Name"/>
        <Link onClick={(event)=> !name === "" ? event.preventDefault() : null} to={"/chat"}><button onClick={sendUsers} className="joinbtn" >Login In</button></Link>
      </div>
    </div>
  );
};

export default Join;

export {users}
