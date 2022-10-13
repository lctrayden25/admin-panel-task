const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const User = require("./User");

app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(
  `mongodb+srv://Rayden:54867997@cluster0.sa1vgny.mongodb.net/?retryWrites=true&w=majority`,
  () => {
    console.log("Connected.");
  }
);

app.get("/", (req, res) => {
  res.send("HOME");
});

// user register
app.post("/register", async (req, res) => {
  const data = req.body;
  const isRegister = await User.findOne({ email: data.email });

  if (isRegister) {
    res.status(400).json({
      message: "User existed already!",
      data: {},
    });
  } else {
    const userRegister = await User.create({
      ...data,
      status: "Pending",
      createAt: new Date().now(),
    });
    res.status(200).json({
      message: "User register successfully.",
      data: userRegister,
    });
  }
});

//user login
app.post("/login", async (req, res) => {
  const data = req.body;
  const user = await User.findOne({
    email: data.email,
    password: data.password,
  });
  console.log(user);
  if (user) {
    res.status(200).json({
      message: "Login successfully",
      id: user._id,
      data: user,
    });
  } else {
    res.status(400).json({
      message: "Incorrect username or password.",
    });
  }
});

//get user
app.get("/admin/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res
      .status(400)
      .json({
        message: "User not found",
      })
      .send();
  }
});

//get all user
app.get("/admin", async (req, res) => {
  const user = await User.find();
  if (user || user.length > 0) {
    res.send(user);
  }
});

//edit user
app.post("/edit/:id", async (req, res) => {
  const data = req.body;
  const userEdit = await User.findByIdAndUpdate(data._id, data);
  console.log(userEdit);
  if (userEdit) {
    res.status(200).json({
      message: "Update successfully",
    });
  } else {
    res.status(400).json({
      message: "Update failed",
    });
  }
});

//update status
app.post("/status/:id", async (req, res) => {
  const data = req.body;
  const updateStatus = await User.findByIdAndUpdate(data.id, data);

  if (updateStatus) {
    res.status(200).json({
      message: "Status Update Successfully.",
    });
  } else {
    res.status(400).json({
      message: "Stutus Update Failed.",
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
