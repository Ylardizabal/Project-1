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
          var labelstring = JSON.stringify(feature.key + 1);
          console.log(labelstring);
          var marker = new google.maps.Marker({
            position: feature.position,
            // position: {lat: 40.3486111, lng: -74.6594444},
            icon: "https://cdn4.iconfinder.com/data/icons/bold-purple-free-samples/32/Geotag_Tag_Geography_Map_Position_Pin-32.png",
            map: map,
            label: labelstring,
            animation: google.maps.Animation.DROP,
            title: feature.title
          });
          var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h3 id="firstHeading" class="firstHeading">' + feature.title + '</h3>'+
            '<div id="bodyContent">'+
            '<p>'+ feature.deal +'</p>'+
            '<p> <a href="'+feature.linkurl+' " target="_blank">'+
            'Deal Link</a>'+
            '</div>'+
            '</div>';

          var infowindow = new google.maps.InfoWindow({
          content: contentString
          });

          marker.addListener('click', function() {
          infowindow.open(map, marker);
          });

          console.log(marker);
        });

      }
      //})