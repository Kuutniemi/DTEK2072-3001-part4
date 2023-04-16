require("dotenv").config();

let PORT = process.env.PORT;
let MONGOURI = process.env.MONGO;

module.exports = {
  MONGOURI,
  PORT,
};
