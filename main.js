let map;

document.addEventListener("DOMContentLoaded", () => {
    let sc = document.createElement("script");
    document.head.appendChild(sc);
    sc.addEventListener("load", () => {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 10.31672, lng: 123.89071},
            zoom: 16
        });
        addmarker({lat: 10.318487004786979, lng: 123.89610528945923}); // Ricos Lechon
        addmarker({lat: 10.317558135101828, lng: 123.89408826828003}); // Zubuchon
        addmarker({lat: 10.31506706195805, lng: 123.88988256454468}); // Yaksi Barbeque
        addmarker({lat: 10.318233676962913, lng: 123.8866639137268}); // Planet Vegis

        // google.maps.event.addListener(map, 'click', function( event ){
        //     alert( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng() ); 
        //   });
          
    });
    
    function addmarker(coords)
    {
        let marker = new google.maps.Marker({
            position:coords,
            map:map
        });
    }

    sc.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDH4OBjjPhhCrDqyT1y109uvg2WvZZ-trQ";
});