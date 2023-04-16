const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json and there's right amount of them", async () => {
  // En jaksanut tehdä toista apia, jossa uudet blogit testaamista varten
  const blogs = await api.get("/api/blogs");
  const length = blogs.length;

  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
    .expect((res) => res.length === length);
});

test("Test adding blogs work and the amount of blogs increases", async () => {
  const blogs = await api.get("/api/blogs");
  let length = blogs.length;

  const newBlog = {
    title: "Test blog",
    author: "Test author",
    url: "Test url",
    likes: 0,
  };
  await api.post("/api/blogs").send(newBlog).expect(201);
  const blogss = await api.get("/api/blogs");
  expect(blogss.length === length + 1);
});

test("Deleting blogs works and the amount of blogs decreases", async () => {
  const blogs = await api.get("/api/blogs");
  let length = blogs.length;

  let id = blogs._body[0].id;

  //   console.log("ID: ", blogs._body[0].id);

  await api.delete(`/api/blogs/${id}`).expect(204);
  const blogss = await api.get("/api/blogs");
  expect(blogss.length === length - 1);

  // Check that not of Bloggs has id of deleted blog
  blogss._body.forEach((blog) => {
    expect(blog.id).not.toBe(id);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
