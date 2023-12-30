const express = require("express");
const { blog } = require("../models/blog");
const multer = require("multer");
const router = express.Router();
const path = require("path");

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

router.get('/:id' , async(req,res)=>{
  const findBlog =  await blog.findById(req.params.id);
  return res.json(findBlog);
});

router.post("/addnew", upload.single("coverImage"), async (req, res) => {
  const {title,content}= req.body;

  const newBlog = await blog.create({
    title,
    content,
    createdBy: req.user._id,
    coverImageUrl: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${newBlog._id}`);
  // return res.json({ "blog" : newBlog ,"msg" :"blog is created"});
});
module.exports = router;
