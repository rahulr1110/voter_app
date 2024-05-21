const express = require("express");
const dotenv = require("dotenv");
const bodyparse = require("body-parser");
const connectDB = require("./db/db");
const app = express();
dotenv.config();
connectDB();
app.use(bodyparse.json());

const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");

app.use("/user", userRoutes);
app.use("/candidate", candidateRoutes);
app.use("/voter", candidateRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server started");
});
