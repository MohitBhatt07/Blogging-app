const express = require("express");
const { blog } = require("../models/blog");
const multer = require("multer");

const router = express.Router();
const path = require("path");
const User = require("../models/user");

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
  const blogCreator = await User.findById(findBlog.createdBy);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const blogDate =  findBlog.createdAt.toLocaleDateString('en-US', options).toUpperCase();
  return res.render('blog' ,{ blog  :findBlog, blogDate : blogDate,blogCreator : blogCreator,user : req.user} );
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
