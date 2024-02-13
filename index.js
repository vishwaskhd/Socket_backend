const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const http = require("http");
const server = http.createServer(app);
const common_api = require("./src/helpers/common_api");

const dotenv = require("dotenv");
const router = require("./src/routes/routes");
var bodyParser = require("body-parser");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    // methods: ["GET", "POST"],
    // transports: ['websocket', 'polling'],
    // credentials: true
  },
  // allowEIO3: true
});

dotenv.config({ path: path.join(__dirname, "/.env") });
const port = process.env.PORT || "3003";
app.set("port", port);
app.use(cors());

//for CORS
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  req.header("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.urlencoded({ limit: "500mb", extended: false }));

// parse application/json
app.use(bodyParser.json({ limit: "500mb" }));
app.use(express.json({ limit: "500mb" }));

const db = require("./src/models");
db.sequelize.sync({alter: true,
  force: false,})
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use("/api", router);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
server.keepAliveTimeout = 180 * 1000;

function onError(error) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

// Handle socket connections
io.on("connection", async (socket) => {
  console.log("A user connected");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on("join_chat", (data) => {
	let chatRoom = '';
	if (data.fromUser < data.toUser) chatRoom = data.fromUser + "_" + data.toUser
    else chatRoom = data.toUser + "_" + data.fromUser
    socket.join(chatRoom);
  });
  socket.on("new_message", async (data) => {
	
    let chatRoom = '';
	if (data.fromUser < data.toUser) chatRoom = data.fromUser + "_" + data.toUser
    else chatRoom = data.toUser + "_" + data.fromUser
    io.to(chatRoom).emit("message_received", data.newMessageRecieved);
    let message_data = {
      room: chatRoom,
      message: data.newMessageRecieved,
      sender_id: data.fromUser,
    };
    await common_api.createData(message_data, db.messages);
  });

  socket.on("join group", async (roomId) => {
    socket.join(roomId);
    console.log(`User Joined Group: ${roomId}`);
  });

  socket.on("new group message", (messageData) => {
    const { sender, message, image, groupID } = messageData;
    console.log(`New message in group ${groupID}: ${message}:${image}`);
    socket.to(groupID).emit("group message received", messageData);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
