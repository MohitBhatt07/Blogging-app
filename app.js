const express = require("express");
const path = require("path");
const userRouter = require("./routes/userRoutes");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const blogRouter = require("./routes/blogRoutes");
const { checkForAuthentication } = require("./middlewares/authenticationMiddleware");
const { blog } = require("./models/blog");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => console.log("MongoDB connected successfully "));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());
app.use(checkForAuthentication("token"));
app.use(express.static(path.resolve('./public')));

app.get("/", async(req, res, next) => {
  const allBlogs = await blog.find({});
  return res.render("homepage" ,{user : req.user , allBlogs : allBlogs} );
});

app.use("/user", userRouter);
app.use('/blog',blogRouter);
app.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);
