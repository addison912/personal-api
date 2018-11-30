/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

const express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models");

// generate a new express app and call it 'app'
const app = express();

// serve static files in public
app.use(express.static("public"));
app.use(express.json());

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// profile object
let profile = {
  name: "Addison Moore",
  githubUsername: "addison912",
  githubLink: "https://github.com/addison912",
  githubProfileImage:
    "https://avatars2.githubusercontent.com/u/20761462?s=460&v=4",
  currentCity: "Oakland, CA",
  personalSiteLink: "https://addison912.github.io/about-me/",
  Pets: [
    { name: "Murphy", image: "https://i.imgur.com/Hc2TlkZ.jpg" },
    { name: "Wilson", image: "https://i.imgur.com/9Pc94se.jpg" }
  ]
};

////////////////////
//  ROUTES
///////////////////

// define a root route: localhost:3000/
app.get("/", function(req, res) {
  res.sendFile("views/index.html", { root: __dirname });
});

app.get("/api/profile", (req, res) => {
  res.json(profile);
});

app.get("/api/places", (req, res) => {
  // send all places as JSON response
  db.Place.find((err, places) => {
    if (err) {
      console.log("index error: " + err);
      res.sendStatus(500);
    }
    res.json(places);
  });
});

// get one place
app.get("/api/places/:id", function(req, res) {
  // find one place by its id
  db.Place.findOne({ _id: req.params.id }, (err, foundPlace) => {
    if (err) {
      return console.log(err);
    }
    res.json(foundPlace);
  });
});

// create a new place
app.post("/api/places", function(req, res) {
  // create new place with form data (`req.body`)
  console.log("create", req.body);
  var newPlace = req.body;

  db.Place.create(newPlace, (err, savedPlace) => {
    if (err) {
      return console.log(err);
    }
    res.json(savedPlace);
  });
});

// delete a place
app.delete("/api/places/:id", function(req, res) {
  // get place id from url params (`req.params`)
  console.log("places", req.params);
  var placeId = req.params.id;
  // find the index of the place we want to remove
  db.Place.findByIdAndDelete(placeId, (err, deletedPlace) => {
    if (err) {
      return console.log(err);
    }
    res.json(deletedPlace);
  });
  console.log("deleting place with id", placeId);
});

// update place
app.put("/api/places/:id", function(req, res) {
  // get place id from url params (`req.params`)
  var placeId = req.params.id;
  // find the index of the place we want to update
  db.Place.findByIdAndUpdate(
    placeId,
    req.body,
    { new: true },
    (err, updatedPlace) => {
      if (err) {
        return console.log(err);
      }
      res.json(updatedPlace);
    }
  );
});

//run server on port 3001
app.listen(process.env.PORT || 3001, () => {
  console.log("personal api app listening at http://localhost:3001/");
});
