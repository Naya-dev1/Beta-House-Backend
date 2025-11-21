const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const authRouter = require("./routes/authRouter");
const userRoute = require("./routes/userRoute");
const propertyRoute = require("./routes/propertyRoute");
const app = express();

const port = process.env.PORT || 4000;

require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/favourite", userRoute);
app.use("/api/property", propertyRoute);

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Database Connected");

  try {
    app.listen(port, () => {
      console.log(`Server running on PORT ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();

// onyekwelibestephanie_db_user W6aqCBVf0bXHhZsH

// mongdb+srv://onyekwelibestephanie_db_user:W6aqCBVf0bXHhZsH@cluster0.w6neify.mongodb.net/?appName=Cluster0o



// https://pin.it/6Gs8jVII6