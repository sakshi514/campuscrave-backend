const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();


const app = express();
connectDB();

//Create server
const server = http.createServer(app);

//Socket setup
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

//Socket Connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//make it global
app.set("io", io);

// Middleware
app.use(cors());
app.use(express.json());

// AuthRoute
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vendors", require("./routes/vendorRoutes"));
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/system", require("./routes/systemRoutes"));


// Test route
app.get("/", (req, res) => {
  res.send("CampusCrave backend running");
});

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
