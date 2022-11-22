const express = require("express");
const router = express.Router();

const userController = require("../controllers/users-controllers");

router.get("/", userController.SignIn); // Sign In
router.post("/", userController.addUser); // Add User

module.exports = router;
