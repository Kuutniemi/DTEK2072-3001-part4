const BlogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

BlogsRouter.get("/", (request, response) => {
  Blog.find({})
    .populate("user")
    .then((blogs) => {
      response.json(blogs);
    });
});

BlogsRouter.post("/", async (request, response) => {
  const { title, author, url, likes } = request.body;

  const users = await User.find({});
  const user = users[0];

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
