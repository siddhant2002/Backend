const express = require("express");

const{ connectMongoDB } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user")
const app = express();

// Route
connectMongoDB("mongodb://127.0.0.1:27017/siddhant");


app.use(express.urlencoded({ extended : false}));

app.use(logReqRes("log.txt"));

app.use("/api/users", userRouter);

const port = 8000;

app.listen(port, () => console.log("Listening at 8000"));