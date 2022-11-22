const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
// routes
const userRouter = require("./routes/user-routes");

const server = express();

const PORT = process.env.PORT || 8000;

mongoose
  .connect(
    "mongodb+srv://ArazDev:NsY7vhOMtZ5ZEn9K@cluster0.nbgdbjw.mongodb.net/movlix?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connect To Database"))
  .then(() => server.listen(PORT))
  .catch((err) => console.log(err.message));

server.use(express.json());

  server.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    })
  );

server.use("/users", userRouter);
