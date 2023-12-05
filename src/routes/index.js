const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  redirectIfAuthenticated,
} = require("../middleware/auth");
const User = require("../models/user");
const Report = require("../models/report");
const upload = require("../config/multer");
const moment = require("moment");
const canvas = require("canvas");
const faceapi = require("face-api.js");

router.get("/logout", (req, res) => {
  req.currentUser = {};
  res.clearCookie("user");
  res.redirect("/login");
});

router.get("/", ensureAuthenticated, async (req, res) => {
  res.render("home", { user: req.currentUser });
});

router.get("/register", redirectIfAuthenticated, (req, res) => {
  res.render("registration", { name: "chen" });
});

router.post("/register", upload.single("photo"), async (req, res) => {
  try {
    const { firstName, lastName, dob, bloodSugar, userDocumentID } = req.body;
    const userImageURL = req.file.path;

    const image = await canvas.loadImage(userImageURL);
    const detections = await faceapi.detectAllFaces(image);

    if (detections.length === 0) {
      return res.status(400).send({
        error:
          "Image does not contain a recognizable face. Please upload a clear face image.",
      });
    }

    const user = new User({
      firstName,
      lastName,
      dateOfBirth: new Date(dob),
      userImageURL,
      entrySugarLevel: bloodSugar,
      userDocumentID,
    });

    await user.save();
    res.redirect("/login");
  } catch (e) {
    if (e.code === 11000) {
      res
        .status(400)
        .send({ error: "User with the given Document ID already exists." });
    } else {
      res.status(400).send({ error: "Registration Failed" });
    }
  }
});

router.get("/login", redirectIfAuthenticated, (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  try {
    const { userID } = req.body;
    const user = await User.findOne({ userDocumentID: userID });
    req.currentUser = user;
    if (!user) {
      return res.status(401).send({ error: "Login failed" });
    }
    res.cookie("user", JSON.stringify(user));
    res.render("home", { user });
  } catch (e) {
    res.status(400).send({ error: "Login failed" });
  }
});

router.get("/addReport", ensureAuthenticated, (req, res) => {
  res.render("report");
});

router.post("/addReport", async (req, res) => {
  try {
    const { food, sugarLevel } = req.body;
    const rDate = new Date();
    const report = new Report({
      reportDate: rDate,
      foodAte: food,
      sugarLevelTwoHoursLater: sugarLevel,
      userID: req.currentUser.userDocumentID,
    });
    await report.save();
    res.status(200).send({ success: "Report saved successfully!" });
  } catch (e) {
    res.status(400).send({ error: "Report didn't save" });
  }
});

router.get("/foodHistory", ensureAuthenticated, async (req, res) => {
  try {
    const userID = req.currentUser.userDocumentID;
    const reports = await Report.find({ userID }).sort({ reportDate: 'desc' });
    res.render("foodhistory", { reports });
  } catch (e) {
    res.status(400).send({ error: e });
  }
});


router.get("/graph", ensureAuthenticated, (req, res) => {
  const emptyData = {
    labels: [],
    datasets: [
      {
        label: "Sugar Levels",
        data: [],
      },
    ],
  };
  res.render("graph", { data: emptyData });
});

router.post("/graph", ensureAuthenticated, async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const startDateTime = moment(startDate).startOf("day").toISOString();
    const endDateTime = moment(endDate).endOf("day").toISOString();
    const userID = req.currentUser.userDocumentID;
    const reports = await Report.find({
      userID: userID,
      reportDate: {
        $gte: startDateTime,
        $lte: endDateTime,
      },
    }).sort("reportDate");
    const dates = reports.map(
      (report) => report.reportDate.toISOString().split("T")[0]
    );
    const sugarLevels = reports.map((report) => report.sugarLevelTwoHoursLater);
    const data = {
      labels: dates,
      datasets: [
        {
          label: "Sugar Levels",
          data: sugarLevels,
        },
      ],
    };
    res.json(data);
  } catch (e) {
    res.status(400).send({ error: e });
  }
});


module.exports = router;
