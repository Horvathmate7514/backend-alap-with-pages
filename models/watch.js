const mongoose = require("mongoose");

const watchSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    
  },
  Model: {
    type: String,
    required: true,
    maxlength: 30,
  },
  Case_Material: {
    type: String,
    required: true,
    maxlength: 30,
  },
  Water_Resistance: {
    type: Number,
  },
  Case_Diameter: {
    type: Number,
    required: true,
  },
  Dial_Color: {
    type: String,
    required: true,
    maxlength: 20,
    
  },
  Price_USD: {
    type: Number,
    required: false,
    min: [1.0, "Az ennyire olcsó óra nem számít luxusórának!"],
  },
  Brand_Id: {
    type: Number,
    required: true,
    ref: "BrandModel",
  },
});

module.exports = mongoose.model("WatchModel", watchSchema, "watches"); // ezzel a névvel lesz létrehozva a kollekció.
