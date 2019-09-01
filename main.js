let map;

document.addEventListener("DOMContentLoaded", () => {
    let sc = document.createElement("script");
    let searhField = document.getElementById("searhField");
    document.head.appendChild(sc);

    sc.addEventListener("load", () => {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 10.31672, lng: 123.89071},
            zoom: 16
        });


        // add marker for 4 store
        addmarker("Ricos Lechon", {lat: 10.318487004786979, lng: 123.89610528945923}, "PriChon, Camaro Rebosado, Crispy Feetchon");
        addmarker("Zubuchon",{lat: 10.317558135101828, lng: 123.89408826828003}, "Zubuchon Sisig, Bangus Sisig, Chorizo Lumpia");
        addmarker("Yaksi Barbeque",{lat: 10.31506706195805, lng: 123.88988256454468}, "Pork Barbeque, Chicken Leg, Tuna Belly"); 
        addmarker("Planet Vegis",{lat: 10.318233676962913, lng: 123.8866639137268}, "BBQ, Chili Cheese Rocket, Chicharon Bean Curd"); 


        var defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(10.2833322, 123.8907089),
            new google.maps.LatLng(10.31672, 123.8999964)
        );

        var options = {
            bounds: defaultBounds
        };
        
        var searchBox = new google.maps.places.SearchBox(searhField);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(searhField);
        var autocomplete = new google.maps.places.Autocomplete(searhField, options);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
            searchBox.setBounds(map.getBounds());
        });

        var markers = [];

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
            var places = searchBox.getPlaces();
  
            if (places.length == 0) {
              return;
            }
  
            // Clear out the old markers.
            markers.forEach(function(marker) {
              marker.setMap(null);
            });
            markers = [];
  
            // For each place, get the icon, name and location.
            var bounds = new google.maps.LatLngBounds();
            places.forEach(function(place) {
              if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
              }
              var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };
  
              // Create a marker for each place.
              markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
              }));
  
              if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
            });
            map.fitBounds(bounds);
          });
        // google.maps.event.addListener(map, 'click', function( event ){
        //     alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() ); 
        //   });
          
    });
    
    function addmarker(title, coords, menu)
    {
        var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">'+title+'</h1>'+
            '<div id="bodyContent">'+
            '<p><b>'+title+'</b>, Menu : '+menu+'</p>'+
            '</div>'+
            '</div>';
        // set marker    
        let marker = new google.maps.Marker({
            position:coords,
            map:map,
            title:title
        });
        // add info window per store
        let infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        // set window content per store
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }

    sc.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDH4OBjjPhhCrDqyT1y109uvg2WvZZ-trQ&libraries=places";
});