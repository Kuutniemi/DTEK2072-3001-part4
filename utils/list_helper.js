const User = require("../models/user");

// ...

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

module.exports = {
  dummy,
  totalLikes,
  usersInDb,
};
