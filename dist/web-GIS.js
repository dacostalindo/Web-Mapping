// Full Screen map view 
var mapId = document.getElementById('map');
function fullScreenview() {
    if (document.fullscreenElement) { 
        document.exitFullscreen()
    } else {
        mapId.requestFullscreen();
    }
    
}


L.control.browserPrint({position: 'topright'}).addTo(map);


// Leaflet search
L.Control.geocoder().addTo(map);

// Leaflet Measure
L.control.measure({ 
    primaryLengthUnit: 'kilometer', 
    secondaryLengthUnit: 'meter', 
    primaryAreaUnit: 'acres', 
    secondaryAreaUnit: undefined
}).addTo(map);


// zoom to layer
$('.zoom-to-layer').click(function(){
    map.setView([38.86, 71.27], 7);
});