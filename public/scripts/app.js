console.log("Sanity check");

const PLACES = "../../api/places";
let places = [];
$(document).ready(function() {
  $.ajax({
    url: PLACES,
    method: "GET",
    success: function(response) {
      console.log(response);
      response.forEach(function(place) {
        places.push(place);
        addPlace(place);
      });
      function initMap() {
        let map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 37.8044, lng: -122.2711 },
          zoom: 2
        });
        places.forEach(function(place) {
          let location = {
            lat: place.coordinates.lat,
            lng: place.coordinates.lon
          };
          let marker = new google.maps.Marker({
            position: location,
            map: map
          });
        });
      }
      initMap();
    }
  });
  addEditDeleteListeners();
});

function addPlace(place) {
  $("#places").prepend(`
        <div class="place-list-item place" id="${place._id}">
            <img src="${place.photo}">
            <h3>${place.city} ${place.state}</h3>
            <p>${place.description}</p>
            <p><strong>Hightlights:</strong>${place.highlights}</p>
            <div class="form-row">
                <form><button class="edit" value="edit" type="submit">EDIT</button></form><form><button class="delete" value="delete" type="submit">DELETE</button></form>
            </div>
        </div>
    `);
}

$("#create-form").on("submit", function(e) {
  e.preventDefault();
  console.log("form submitted");

  newPlace = {
    city: $("#city").val(),
    state: $("#state").val(),
    country: $("country").val(),
    coordinates: { lat: $("#lat").val(), lon: $("#lon").val() },
    photo: $("#photo").val(),
    date: $("#date").val(),
    description: $("#description").val(),
    highlights: $("#highlights").val(),
    livedThere: $("#livedThere").prop("checked")
  };

  newPlaceString = JSON.stringify(newPlace);

  console.log(newPlace);
  $.ajax({
    url: PLACES,
    method: "POST",
    contentType: "application/json",
    data: newPlaceString,
    dataType: "json",
    success: function(response) {
      console.log(`created new place: ${response}`);
      addPlace(response);
    }
  });
});

function addEditDeleteListeners() {
  $(".delete").on("submit", function(e) {
    e.preventDefault();
    // console.log(e.target.parentElement.attr("id"));
    console.log("working");
  });
}
