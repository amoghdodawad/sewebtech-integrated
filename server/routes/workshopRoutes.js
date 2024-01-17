const express = require("express");
const router = express.Router();
const Workshop = require("../models/workshop.model");

router.route("/add").options((req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.status(200).end();
});

router.route("/add").post(async (req, res) => {
  try {
    const { workshopDetails, start_date, end_date } = req.body;

    const newWorkshop = new Workshop({ workshopDetails, start_date, end_date });

    await newWorkshop.save();
    res.json("Workshop added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/all").get(async (req, res) => {
  try {
    const workshops = await Workshop.find();
    res.json(workshops);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});
router.route("/edit/:id").put(async (req, res) => {
  try {
    const { workshopDetails, start_date, end_date } = req.body;
    const workshopId = req.params.id;

    await Workshop.findByIdAndUpdate(workshopId, {
      workshopDetails,
      start_date,
      end_date,
    });

    res.json("Workshop updated!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});
router.route("/delete/:id").delete(async (req, res) => {
  try {
    const workshopId = req.params.id;
    await Workshop.findByIdAndDelete(workshopId);
    res.json("Workshop deleted!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
