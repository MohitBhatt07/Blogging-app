const express = require("express");
const User = require("../models/user");
const { createTokenForUser } = require("../services/authentication");

const router = express.Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/login", (req, res) => {
  return res.render("login");
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchpasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", { error: "incorrect email or password" });
  }
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await User.create({
      fullName,
      email,
      password,
    });

    const token = createTokenForUser(user);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("login", { error: error });
  }
});

router.get("/logout", async (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
});
module.exports = router;
