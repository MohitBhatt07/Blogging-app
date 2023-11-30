const express = require("express");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");

const app = express();
const PORT = 7000;
mongoose
  .connect("mongodb://localhost:27017/blogIt")
  .then((e) => console.log("MongoDB connected successfully "));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res, next) => {
  return res.render("homepage");
});
app.use("/user", userRouter);

app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
