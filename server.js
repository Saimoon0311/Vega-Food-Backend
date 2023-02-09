const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const body_parser = require("body-parser");
const path = require("path");
const routes = require("./server/routes/router");
const connectDB = require("./server/database/connection");

// require("dotenv").config();
// const uri = process.env.ATLAS_URI;
// console.log(uri);

// mongoose.connect(uri, { useNewUrlParser: true });

// const connection = mongoose.connection;

// connection.once("open", () => {
//   console.log("Connected");
// });

const app = express();
const port = process.env.PORT || 5000;

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(body_parser.urlencoded({ extended: true }));
connectDB();
// const usersRoute = require("./routes/users");
// const exerciseRoute = require("./routes/exercises");

// app.use('/css',express.static(path.resolve(__dirname,"assests/css")))
// app.use('/img',express.static(path.resolve(__dirname,"assests/img")))
// app.use('/js',express.static(path.resolve(__dirname,"assests/js")))
// app.use(require("./server/routes/router"));
// app.use("/exercise", exerciseRoute);
// app.use("/users", usersRoute);

app.use("/", routes);
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
