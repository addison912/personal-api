var db = require("./models");

var places_list = [
  {
    city: "Oakland",
    state: "CA",
    country: "USA",
    coordinates: {
      lat: 37.8044,
      lon: -122.2711
    },
    photo: "https://i.imgur.com/lyaukjs.jpg",
    date: "",
    description: "Lived here since 2015",
    highlights:
      "Claremont Canyon, Catos Ale House, The Alley, Mama's Royal Cafe",
    livedThere: true
  },
  {
    city: "Dubai",
    state: "",
    country: "UAE",
    coordinates: {
      lat: 25.2048,
      lon: 55.2708
    },
    photo: "https://i.imgur.com/pjPKYMx.jpg",
    date: "December 2017",
    description:
      "Went here for work for the Jumanji movie installation at the Mall of Dubai",
    highlights: "Watching the fishing boats come in, sunrise on the hotel roof",
    livedThere: false
  },
  {
    city: "Barcelona",
    state: "",
    country: "Spain",
    coordinates: {
      lat: 41.3851,
      lon: 2.1734
    },
    photo: "https://i.imgur.com/8wn69tv.jpg",
    date: "March, 2018",
    description: "Went on vacation with Lauren",
    highlights:
      "Pre-dawn walks through the city, dinner at Els Sortidors Del Parlament, riding the scooter around town, our apartment, Casa Batlo",
    livedThere: false
  },
  {
    city: "Berkeley",
    state: "CA",
    country: "USA",
    coordinates: {
      lat: 37.8716,
      lon: -122.2727
    },
    photo: "https://i.imgur.com/Zc0GPoY.jpg",
    date: "",
    description:
      "The place where I was born and went to school until 8th grade",
    highlights:
      "Urban Ore, Brazil Cafe, Al Lasher's electronics, the Solano Stroll, Addison St.",
    livedThere: true
  }
];

// remove all records that match {} -- which means remove ALL records
db.Place.remove({}, function(err, places) {
  if (err) {
    console.log("Error occurred in remove", err);
  } else {
    console.log("removed all places");

    // create new records based on the array places_list
    db.Place.create(places_list, function(err, places) {
      if (err) {
        return console.log("err", err);
      }
      console.log("created", places.length, "places");
      process.exit();
    });
  }
});
