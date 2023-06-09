const bcrypt = require("bcrypt");
const UserRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

UserRouter.post("/", async (request, response) => {
  // Should validate that username does not exists but was not required in the exercise
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

// Get all users and populate blogs
UserRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

module.exports = UserRouter;
