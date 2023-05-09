const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./src/routers/router")
const app = express();
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.mongoURl)
  .then(() => console.log("connected to database"))
  .catch((error) => console.log("could not connect to database"));


app.use("/" , router) 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

