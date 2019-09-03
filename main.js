let map;
let markers = [];
let restaurants = [
  {
    title: "Ricos Lechon",
    coords: { lat: 10.318487004786979, lng: 123.89610528945923 },
    menu: "PriChon, Camaro Rebosado, Crispy Feetchon",
    type: "Contemporary Casual",
    no: 100,
    tag: "1",
    display: 1
  },
  {
    title: "Zubuchon",
    coords: { lat: 10.317558135101828, lng: 123.89408826828003 },
    menu: "Zubuchon Sisig, Bangus Sisig, Chorizo Lumpia",
    type: "Fast Casual",
    no: 500,
    tag: "2",
    display: 1
  },
  {
    title: "Yaksi Barbeque",
    coords: { lat: 10.31506706195805, lng: 123.88988256454468 },
    menu: "Pork Barbeque, Chicken Leg, Tuna Belly",
    type: "Fast Casual",
    no: 110,
    tag: "2",
    display: 1
  },
  {
    title: "Planet Vegis",
    coords: { lat: 10.318233676962913, lng: 123.8866639137268 },
    menu: "BBQ, Chili Cheese Rocket, Chicharon Bean Curd",
    type: "Family Style",
    no: 89,
    tag: "3",
    display: 1
  },
  {
    title: "Ice Giants",
    coords: { lat: 10.315214838033565, lng: 123.8909125328064 },
    menu: "Ice giants, Mexican tostada, Mango giants",
    type: "Contemporary Casual",
    no: 80,
    tag: "1",
    display: 1
  },
  {
    title: "Jollibee",
    coords: { lat: 10.31544705744066, lng: 123.8852047920227 },
    menu: "Yum burger, Jolly Hotdog, Tuna Pie",
    type: "Fast Food",
    no: 2000,
    tag: "4",
    display: 1
  },
  {
    title: "Coffee Notes Caffe",
    coords: { lat: 10.315594833337782, lng: 123.89466762542725 },
    menu: "Choco Fraup, Coffee",
    type: "Cafe",
    no: 300,
    tag: "5",
    display: 1
  },
  {
    title: "House of Lechon",
    coords: { lat: 10.317748131396826, lng: 123.90170574188232 },
    menu: "Lechon Sisig, Lechon paksiw, barn-iBisaya",
    type: "Contemporary Casual",
    no: 150,
    tag: "1",
    display: 1
  },
  {
    title: "The Pig and Palm",
    coords: { lat: 10.312892634541782, lng: 123.90449523925781 },
    menu: "Roasted parrot fish, Confit pork belly, Beer battered Fish and chips",
    type: "Fine Dining",
    no: 50,
    tag: "6",
    display: 1
  }
];

document.addEventListener("DOMContentLoaded", () => {
  let sc = document.createElement("script");
  document.head.appendChild(sc);
  var opt = document.getElementsByClassName("restaurant");

  for (var i = 0; i < opt.length; i++) {
    opt[i].addEventListener('click', displayCheck);
  }

  sc.addEventListener("load", () => {
    
    
    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 10.31672, lng: 123.89271 },
      zoom: 16
    });
    
    // clicker();
    // loadSearch();
    drawCircle();

    deleteMarkers();

    // pin all restaurants
    showMarkers();

    
  });

  function displayCheck()
  {
    deleteMarkers();
    var display = 1;
    let checkBox = this;

    if (checkBox.checked == true) {
      display = 1;
    } 
    else {
      display = 0;
    }

    restaurants.forEach(function(el){
      if (el.tag === checkBox.id) {
        el.display = display;
      }
    });
    showMarkers();
  }

  // draw circle
  function drawCircle()
  {
    // circle block
    // First, create an object containing LatLng and population for each city.
    var circlemap = {
      cebu: {
        center: { lat: 10.31672, lng: 123.89491 }
      }
    };

    for (var city in circlemap) {
      // Add the circle for this city to the map.
      var cityCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        map: map,
        center: circlemap[city].center,
        radius: 400
      });
    }
  } 

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    restaurants.forEach(function(el){
      if (el.display === 1) {
        addmarker(
          el.title,
          el.coords,
          el.menu,
          el.type,
          el.no
        );
      }
    });
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }


  // function to add marker
  function addmarker(title, coords, menu, type, no) {
    var contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">' +
      title +
      "</h1>" +
      '<div id="bodyContent">' +
      "<p><b>Type: </b>" +
      type +
      "</p>" +
      "<p> <b>Menu: </b>" +
      menu +
      "</p>" +
      "<p> <b>Customer Visited: </b>" +
      no +
      "</p>" +
      "</div>" +
      "</div>";
    // set marker
    let marker = new google.maps.Marker({
      position: coords,
      map: map,
      title: title
    });
    // add info window per store
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    // set window content per store
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });

    markers.push(marker);
  }

  function clicker()
  {
    google.maps.event.addListener(map, "click", function(event) {
          alert(
            "Latitude: " +
              event.latLng.lat() +
              " " +
              ", longitude: " +
              event.latLng.lng()
          );
        });
  }

  function loadSearch()
  {
    let searhField = document.getElementById("searhField");
    // search block
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
    map.addListener("bounds_changed", function() {
      searchBox.setBounds(map.getBounds());
    });

    var markers = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", function() {
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
        markers.push(
          new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
    
  }

  sc.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyDH4OBjjPhhCrDqyT1y109uvg2WvZZ-trQ&libraries=places";
});
