const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const authenticateToken = require('../middleware/authMiddleware');


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get('/verify', authenticateToken, (req, res) => {
  res.json({ user: req.user }); // make sure `req.user` is set by the middleware
});
module.exports = router;
