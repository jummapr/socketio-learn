const http = require("http");
const express = require("express");

const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
const port = 4000 || process.env.PORT;

const users = [{}];

app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joined", (data) => {
    users[socket.id] = data.users;
    console.log(`${data.users} has joined.`);

    //* Emit a 'UserJoined' event to all connected sockets except the current one,
    //* indicating that the user with the socket ID 'socket.id' (retrieved from 'users')
    //* has joined the chat. The message includes the username and a welcome message.
    socket.broadcast.emit("UserJoined", {
      user: "Admin",
      message: `${users[socket.id]} has joined the chat`,
    });
    socket.emit("welcome", {
      user: "Admin",
      message: `${users[socket.id]} Welcome to the chat`,
    });
  });

  socket.on("message", (data,id) => {
    console.log(data)
    io.emit("sendMessage", {user:users[data.id],message:data.message,id: data.id})
  })

  socket.on("disconnected", () => {
    socket.broadcast.emit("leave", {user: "Admin",message: `User has left`})
    console.log("user left");
  });
});

server.listen(port, () => {
  console.log("Server is running on port", port);
});
