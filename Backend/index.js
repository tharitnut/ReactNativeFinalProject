const uri =
  "mongodb+srv://rutharitst:nut150347@cluster0.ylblq.mongodb.net/Active?retryWrites=true&w=majority&appName=Cluster0";
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
const port = 5000;
const cors = require("cors");
const User = require("./models/User");

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  let saveUser = new User({
    username: "Nigga5678",
    password: "ILoveBBC",
    alarm: {
      time: "5.30",
      alert: true,
      part: "shoulder",
      day: [null],
      duration: 30,
    },
    bodyPart: [null],
  });
  saveUser.save();
  res.status(200).json({ mess: "Test" });
});

app.get("/user", async (req, res) => {
  let findUser = await User.find();
  console.log(findUser);
});

app.post("/update/alarm", async (req, res) => {
  const { setAlarm, username } = req.body;

  try {
    console.log(`Updating alarm for user: ${username}`);

    const response = await User.findOneAndUpdate(
      { username },
      {
        $set: {
          alarm: {
            time: setAlarm.time,
            alert: setAlarm.alert,
            part: setAlarm.part,
            day: setAlarm.day,
            duration: setAlarm.duration,
          },
        },
      }
    );

    if (response) {
      res
        .status(200)
        .json({ message: "Alarm updated successfully", data: response });
    } else {
      res.status(404).json({ message: "User or alarm not found" });
    }
  } catch (error) {
    console.error("Error updating alarm:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(username);

  const response = await User.findOne({ username: username });
  console.log(response);
});

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
