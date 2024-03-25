const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    
  },
  Name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [30, "A név nem tartalmazhat 30 karakternél többet!"],
  },
  Country: {
    type: String,
    default: "Switzerland", // (4.feladat megadja de a táblázat szerint kötelező mező)
    maxlength: [20, "Az ország nem tartalmazhat 20 karakternél többet!"],
  },
  Founded: {
    type: Number,
    required: true,
    max: [new Date().getFullYear(), "Jövőben alapítandó céget nem tartalmazhat az adatbázis!"]
  }
});

module.exports = mongoose.model(
  "BrandModel",
  brandSchema,
  "brands"
);
