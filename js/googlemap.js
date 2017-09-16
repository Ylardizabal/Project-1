// $(document).ready(function() {

// Google Map API
      var map;
      function initMap() {

        console.log("map working")
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: new google.maps.LatLng(localStorage.getItem("zipcodeLat"), localStorage.getItem("zipcodeLng")),
          mapTypeId: 'roadmap'
        });
        console.log("local storage locations")
        console.log(JSON.parse(localStorage.getItem("locations")));

        var locations= (JSON.parse(localStorage.getItem("locations")));
        console.log("within initMap locations")
        console.log(locations);

        // var pins = [
        //   {
        //     position: new google.maps.LatLng(40.2686254, -74.7835104)
        //   }, {
        //     position: new google.maps.LatLng(40.244783, -74.742586)
        //   }, {
        //     position: new google.maps.LatLng(40.275524, -74.794676)
        //   }, {
        //     position: new google.maps.LatLng(40.29467, -74.682773)
        //   }, {
        //     position: new google.maps.LatLng(40.246419, -74.744626)
        //   }];

          // console.log(pins);

         // Create markers.
        locations.forEach(function(feature) {
          console.log("marker working");
          var marker = new google.maps.Marker({
            position: feature.position,
            // position: {lat: 40.3486111, lng: -74.6594444},
            icon: "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
            map: map
          });
          console.log(marker);
        });

      }

      // $(document).ready(function(){

      //       $("#run-search").on("click", function() {
      //           initMap() 
      //       });
      //     });


// })