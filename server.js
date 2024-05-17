const express = require("express");
const dotenv = require("dotenv");
const bodyparse = require("body-parser");
const app = express();
dotenv.config();
app.use(bodyparse.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server started");
});
