let map;

document.addEventListener("DOMContentLoaded", () => {
    let sc = document.createElement("script");
    document.head.appendChild(sc);
    sc.addEventListener("load", () => {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 10.31672, lng: 123.89071},
            zoom: 16
        });

        addmarker("Ricos Lechon", {lat: 10.318487004786979, lng: 123.89610528945923}, "PriChon, Camaro Rebosado, Crispy Feetchon");
        addmarker("Zubuchon",{lat: 10.317558135101828, lng: 123.89408826828003}, "Zubuchon Sisig, Bangus Sisig, Chorizo Lumpia");
        addmarker("Yaksi Barbeque",{lat: 10.31506706195805, lng: 123.88988256454468}, "Pork Barbeque, Chicken Leg, Tuna Belly"); 
        addmarker("Planet Vegis",{lat: 10.318233676962913, lng: 123.8866639137268}, "BBQ, Chili Cheese Rocket, Chicharon Bean Curd"); 

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

    sc.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDH4OBjjPhhCrDqyT1y109uvg2WvZZ-trQ";
});