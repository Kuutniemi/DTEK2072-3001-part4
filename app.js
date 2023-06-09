const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const BlogsRouter = require("./controllers/blogs");
const UserRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(cors());

app.use(middleware.requestLogger);

// One test route Kappa
app.get("/test", (request, response) => {
  response.send("Hello World!");
});

app.use("/api/blogs", BlogsRouter);
app.use("/api/users", UserRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
