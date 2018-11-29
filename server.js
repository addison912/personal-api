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

//run server on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("personal api app listening at http://localhost:3000/");
});
