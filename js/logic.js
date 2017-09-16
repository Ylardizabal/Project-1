$(document).ready(function() {
// SETUP VARIABLES
// ==========================================================

// This variable will be pre-programmed with our authentication key
// (the one we received when we registered)
var authKey = "bKCSH93CLvP0_bF5a-g1";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 0;


// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button
var queryURLBase = "http://api.sqoot.com/v2/deals?api_key=" +
  authKey + "&location=";

// Counter to keep track of result numbers as they come in
var resultsCounter = 0;

var locations = [];

// FUNCTIONS
// ==========================================================

// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
function runQuery(numResults, queryURL) {

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "SqootData"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(SqootData) {

    // Logging the URL so we have access to it for troubleshooting
    console.log("------------------------------------");
    console.log("URL: " + queryURL);
    console.log("------------------------------------");

    // Log the SqootData to console, where it will show up as an object
    console.log(SqootData);
    console.log("------------------------------------");

    // Loop through and provide the correct number of results
    for (var i = 0; i < numResults; i++) {

      // Add to the results Counter (to make sure we show the right number)
      resultsCounter++;

      // Create the HTML well (section) and add the result content for each
      var wellSection = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "article-well-" + resultsCounter);
      $("#well-section").append(wellSection);

      // Confirm that the specific JSON for the result isn't missing any details
      // If the result has a title include the title in the HTML
      if (SqootData.deals[i].deal.title !== "null") {
        $("#article-well-" + resultsCounter)
          .append(
            "<h3 class='articleHeadline'><span class='label label-primary'>" +
            resultsCounter + "</span><strong> " +
            SqootData.deals[i].deal.title + "</strong></h3>"
          );
      // If the result has a description include the descripton in the HTML
      if (SqootData.deals[i].deal.description !== null){
          $("#article-well-" + resultsCounter)
          .append("<h5>" + SqootData.deals[i].deal.description + "</h5>");
        }
      //include the fine print and image in the HTML    
          $("#article-well-" + resultsCounter)
          .append("<h5>" + SqootData.deals[i].deal.fine_print + "</h5>");

          $("#article-well-" + resultsCounter)
          .append("<img src=" + SqootData.deals[i].deal.image_url + "&geometry=150x>");

        // Log the first article's title to console 
        console.log(SqootData.deals[i].deal.title);
        console.log(SqootData.deals[i].deal.merchant.latitude + ", " + SqootData.deals[i].deal.merchant.longitude)
      }

      var lat = SqootData.deals[i].deal.merchant.latitude;
      var long = SqootData.deals[i].deal.merchant.longitude;

      locations.push("position: new google.maps.latlng(" + lat + ", " + long +")");

      console.log(lat + ", " + long);

      //End of Loop
      }

      console.log(locations);

  });


}
// METHODS
// ==========================================================

// on.("click") function associated with the Search Button
$("#run-search").on("click", function(event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks).
  event.preventDefault();

  // Initially sets the resultsCounter to 0
  resultsCounter = 0;

  // Empties the region associated with the articles
  $("#well-section").empty();

  // Grabbing text the user typed into the search input
  searchTerm = $("#zipcode").val().trim();
  var queryURL = queryURLBase + searchTerm + "&category_slugs=restaurants";

  // Number of results the user would like displayed
  numResults = $("#num-records-select").val();

  // Start Year
  radius = $("#radius").val().trim();

  // If the user provides a radius -- the radius will be included in the queryURL
  if (parseInt(radius)) {
    queryURL = queryURL + "&radius=" + radius;
  }

    // Then we will pass the final queryURL and the number of results to
  // include to the runQuery function
  runQuery(numResults, queryURL);
});

// This button clears the top articles section
$("#clear-all").on("click", function() {
  resultsCounter = 0;
  $("#well-section").empty();
});

// Google Map API
var locations = [
  {
    position: new google.maps.LatLng(40.2686254, -74.7835104)
  }, {
    position: new google.maps.latlng(40.244783, -74.742586)
  }, {
    position: new google.maps.latlng(40.275524, -74.794676)
  }, {
    position: new google.maps.latlng(40.29467, -74.682773)
  }, {
    position: new google.maps.latlng(40.246419, -74.744626)
  }];

  console.log(locations);

      var map;
      function initMap() {
        console.log("map working")
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 16,
          center: new google.maps.LatLng(40.3486111, -74.6594444),
          mapTypeId: 'roadmap'
        });

         // Create markers.
        locations.forEach(function(feature) {
          console.log("marker working");
          var marker = new google.maps.Marker({
            position: feature.position,
            // position: {lat: 40.3486111, lng: -74.6594444},
            // icon: 'http://thebouncinbarn.weebly.com/uploads/8/7/5/5/8755827/money_orig.png',
            map: map
          });
        });
      }

// document.ready close
})