const jwt = require("jsonwebtoken");
const BlogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

BlogsRouter.get("/", (request, response) => {
  Blog.find({})
    .populate("user")
    .then((blogs) => {
      response.json(blogs);
    });
});

BlogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  console.log("decodedToken", decodedToken);

  const user = await User.findById(decodedToken.id);
  // const user = users[0];

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

BlogsRouter.delete("/:id", (request, response) => {
  Blog.findByIdAndRemove(request.params.id).then((result) => {
    response.status(204).end();
  });
});

BlogsRouter.put("/:id", (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).then(
    (updatedBlog) => {
      response.json(updatedBlog);
    }
  );
});

module.exports = BlogsRouter;
