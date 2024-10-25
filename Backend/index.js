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

app.get("/api/alarm/:id", async (req, res) => {
  const username = req.params.id;
  console.log(username);

  let data = await User.findOne({ username: username });
  console.log(data);
  res.status(200).json(data);
});

app.post("/insert/alarm", async (req, res) => {
  const { setAlarm, username } = req.body;

  try {
    console.log(`Updating alarm for user: ${setAlarm.duration}`);

    const response = await User.findOneAndUpdate(
      { username },
      {
        $push: {
          alarm: {
            time: setAlarm.time,
            timeFormat: setAlarm.timeFormat,
            part: setAlarm.part,
            day: setAlarm.day,
            duration: setAlarm.duration,
            alert: setAlarm.alert,
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

app.post("/update/alert", async (req, res) => {
  const { username, index, alert } = req.body;

  try {
    console.log(`Updating alarm for user: ${username}`);

    const response = await User.findOneAndUpdate(
      { username },
      {
        $set: { [`alarm.${index}.alert`]: alert },
      },
      { new: true } // คืนค่าข้อมูลหลังจากอัปเดตแล้ว
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

app.post("/delete/alarm", async (req, res) => {
  try {
    const { username, index } = req.body;

    // ค้นหาผู้ใช้และลบ alarm ที่ตำแหน่ง index
    const user = await User.findOneAndUpdate(
      { username: username }, // ค้นหาผู้ใช้ด้วย username
      { $unset: { [`alarm.${index}`]: 1 } }, // ลบ alarm ที่ index ที่ระบุ
      { new: true } // คืนค่าผู้ใช้หลังการอัปเดต
    );

    // ลบตำแหน่งว่างใน array ที่เกิดจากการ unset
    await User.updateOne(
      { username: username },
      { $pull: { alarm: null } } // ลบค่า null ใน array alarm
    );

    res.status(200).json({ message: "Alarm deleted successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/users/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);

    const response = await User.findOne({ username: username });
    console.log(response);
    if (response.password === password) {
      return res.status(200).json(response);
    }
    res.status(404).json({ message: "User not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Sever Error" });
  }
});

app.post("/users/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);

    let saveUser = new User({
      username: username,
      password: password,
      alarm: {
        time: "",
        timeFormat: "",
        alert: true,
        part: "",
        day: [null],
        duration: 0,
      },
      bodyPart: [null],
    });
    saveUser.save();
    if (saveUser) {
      return res.status(200).json({ mess: "Registered Successfully" });
    }
    res.status(404).json({ message: "Something went wrong" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Sever Error" });
  }
});

app.listen(port, () => {
  console.log(`Server run on port ${port}`);
});
