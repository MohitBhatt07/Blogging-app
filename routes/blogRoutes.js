const express = require('express');

const router = express.Router();

router.get('/add-new',(req, res) => {
  res.render('addBlog', {user: req.user})
});

module.exports = router;