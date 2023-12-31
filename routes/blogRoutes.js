const express = require("express");
const { blog } = require("../models/blog");
const multer = require("multer");
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

router.get("/addnew", (req, res) => {
  res.render("addBlog", { user: req.user });
});

router.post('/addnew',upload.single('coverImage'),async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/");
  // const {title , content ,coverImage}  = req.body;
  // const newBlog = await blog.create({title: title, content: content });
  // return res.json({ "blog" : newBlog ,"msg" :"blog is created"});
});
module.exports = router;
