const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

let activeUsers = [];

io.on("connection", (socket) => {
  // Add new user
  socket.on("userConnect", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({ userId: newUserId, socketId: socket.id });
    }

    io.emit("get-users", activeUsers);
  });

  socket.on("send-message", (data) => {
    const { receivedId } = data;
    const user = activeUsers.find((user) => user.userId === receivedId);
    if (user) {
      socket.to(user.socketId).emit("receive-message", data);
    }
  });

  socket.on("likePost", (data) => {
    const ids = [...data.userId.followers, data.userId._id];
    const clients = activeUsers.filter((user) => ids.includes(user.userId));
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("likeToClient", data);
      });
    }
  });

  socket.on("add-conversation", (data) => {
    const clients = activeUsers.filter((user) =>
      data.members.includes(user.userId)
    );
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("conversation-client", data);
      });
    }
  });

  socket.on("create-story", (data) => {
    const clients = activeUsers.filter((user) =>
      data.userId.followers.includes(user.userId)
    );
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("createStory-client", data);
      });
    }
  });

  socket.on("createNotify", (data) => {
    const clients = activeUsers.filter((user) =>
      data.recipients.includes(user.userId)
    );

    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("createNotify-client", data);
      });
    }
  });

  socket.on("removeNotify", (data) => {
    const clients = activeUsers.filter((user) =>
      data.recipients.includes(user.userId)
    );
    // console.log(remove)
    if (clients.length > 0) {
      clients.forEach((client) => {
        socket.to(`${client.socketId}`).emit("removeNotify-client", data);
      });
    }
  });

  socket.on("disconnect", () => {
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    io.emit("get-users", activeUsers);
  });
});

server.listen(process.env.PORT || 8800, () => {
  console.log("socket connected");
});
