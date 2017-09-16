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

var zipcodeLat = "";
var zipcodeLng = "";
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

    //Log zipcode center lat and long
    console.log("SqootData location data");
    console.log(SqootData.query.location.latitude);
    console.log(SqootData.query.location.longitude);
    console.log("------------------------------------");
    //storing it as variables
    zipcodeLat = SqootData.query.location.latitude;
    zipcodeLng = SqootData.query.location.longitude;
    //storing it in localStorage
    localStorage.clear();
    localStorage.setItem("zipcodeLat", zipcodeLat);
    localStorage.setItem("zipcodeLng", zipcodeLng);
    console.log("------------------------------------");
    console.log("localstorage");
    console.log(localStorage.getItem("zipcodeLat"));
    console.log(localStorage.getItem("zipcodeLng"));
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

      // dynamicArray.map(value => ({'key': value, 'val': 'whatever you want'}));
      locations.push('{position: new google.maps.latlng(' + lat + ', ' + long +')}');
      // locations.push({lat: 40.3486111, lng: -74.6594444});

      console.log(lat + ", " + long);
      localStorage.setItem("locations", locations);


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

// document.ready close
})