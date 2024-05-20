const express = require("express");
const dotenv = require("dotenv");
const bodyparse = require("body-parser");
const connectDB = require("./db/db");
const app = express();
dotenv.config();
connectDB();
app.use(bodyparse.json());

const userRoutes = require("./routes/userRoutes");

app.use("/user", userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server started");
});
