const express = require('express');
const path = require('path');

const app =express();
const PORT = 7000;
app.set('view engine' , "ejs");
app.set('views' , path.resolve('./views'));

app.get('/' ,(req,res)=>{
  return res.render("homepage");
});

app.listen(PORT , ()=>console.log(`Server started at http://localhost:${PORT}`));