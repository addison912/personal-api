const mongoose = require("mongoose");
Schema = mongoose.Schema;

const placeSchema = new Schema({
  city: String,
  country: String,
  coordinates: {
    lat: Number,
    lon: Number
  },
  photo: String,
  date: String,
  description: String,
  highlights: String,
  livedThere: Boolean
});

const Place = mongoose.model("Place", PlaceSchema);

module.exports = Place;
