const BlogsRouter = require("express").Router();
const Blog = require("../models/blog");

BlogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

BlogsRouter.post("/", (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = new Blog({
    title,
    author,
    url,
    likes,
  });

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = BlogsRouter;
