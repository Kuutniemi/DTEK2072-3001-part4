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
