const User = require("../models/User");
const { mongoObjectId } = require("../utils/MakeMongoDbId");

// create new user function
const addUser = async (req, res, next) => {
  const { userName, email, password, role = "int User" } = req.body;
  let user;
  try {
    user = new User({
      id: mongoObjectId(),
      userName,
      email,
      password,
      role,
    });
    await user.save();
  } catch (err) {
    console.log(err.message);
  }
  if (!user || user.length <= 0) {
    return res.status(500).json({ message: "Unable To Create User" });
  }
  console.log(user);
  res.status(201).json({
    ...user,
    resultMessage: "Create Account Successfully",
    resultCode: 201,
  });
};
// Sign In
const SignIn = async (req, res, next) => {
  const { userName, password } = req.query;
  let user;

  try {
    user = await User.aggregate([
      { $match: { userName: userName, password: password } },
    ]);
  } catch (err) {
    console.log(err.message);
  }
  console.log(user);
  if (!user || user.length <= 0) {
    return res
      .status(404)
      .json({ resultMessage: "not found user", resultCode: 404, data: {} });
  }
  res.status(200).json({
    resultCode: 200,
    resultMessage: "Sign in SuccessFull",
    data: {
      id: user[0].id,
      userName: user[0].userName,
      email: user[0].email,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      role: user[0].role,
      profilePic: user[0].profilePic,
    },
  });
};

exports.addUser = addUser;
exports.SignIn = SignIn;
