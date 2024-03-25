const express = require("express");
const BrandModel = require("../models/brand");
const WatchModel = require("../models/watch");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let data = null;
    if (req.query.page && req.query.limit) {
      const page = req.query.page
      const limit = req.query.limit
      const skip = (page - 1) * limit;

      data = await WatchModel.find().skip(skip).limit(limit)
    }
    else{

      const price = JSON.stringify(req.query.Price).replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`)
      data = await WatchModel.find({Price_USD: JSON.parse(price)}).sort({Price_USD:1})
    }
    if (data.length !== 0) {
      res.status(200).json(data);
    } else {
      res
        .status(404)
        .json({message: `${price.lt} millió dollárnál olcsóbb óra nincs az adatbázisban!`});
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:modelName", async (req, res) => {
  try {
    const brand = await BrandModel.find({ Name: req.params.modelName });
    const watches = await WatchModel.find({ Brand_Id: brand[0]._id }).populate("Brand_Id");

    if (watches.length !== 0) {
      res.status(200).json(watches);
    } else {
      res
        .status(404)
        .json({ message: "Ehez a modelhez nem tartozik óra!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
