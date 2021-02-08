var map = L.map('map').setView([45, 0], 5);
map.zoomControl.setPosition('topright');

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

//L.marker([38.86, 71.27]).addTo(map)
//    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//    .openPopup();

// add map scale

document.getElementById("geotiff-file").addEventListener("change", function(event) {
    var file = event.target.files[0];
    var extension =  file.name.substring(file.name.length - 3, file.name.length)

    console.log("file:", file);

    if (extension == "tif") {
        var reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = function() {
        var arrayBuffer = reader.result;
        parseGeoraster(arrayBuffer).then(georaster => {

            console.log("georaster:", georaster);
            /*
                GeoRasterLayer is an extension of GridLayer,
                which means can use GridLayer options like opacity.

                Just make sure to include the georaster option!

                http://leafletjs.com/reference-1.2.0.html#gridlayer
            */
            var layer = new GeoRasterLayer({
                georaster: georaster,
                opacity: 1.0,
                resolution: 256
            });
            console.log("layer:", layer);
            layer.addTo(map);

            map.fitBounds(layer.getBounds());
        })
        };
    } else if (extension == "shp") {
        var shapefile = new L.shapefile(file)
        shapefile.addTo(map)
        console.log('shapefile branch')
    }
    
});


L.control.scale().addTo(map)

// Map coordinate display
map.on('mousemove', function(e) { 
    console.log(e)
    $('.coordinate').html(`Lat: ${e.latlng.lat} Lng: ${e.latlng.lng}`)
})



// Markers clusters 
var cluster = L.markerClusterGroup();
var marker = L.geoJSON(data, { 
    onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.name)
    }
});
marker.addTo(cluster);
// cluster.addTo(map);

// Add Geotiff Layer

// Leaflet Layer control
var baseMaps = {
    'OSM': osm,
    'Open Topo': OpenTopoMap
};

//var overlayMaps = {
//    'GeoJSON Markers': cluster,
//
//};



// L.control.layers(baseMaps, overlayMaps, {collapsed: false, position: 'topleft'}).addTo(map);
L.control.layers(baseMaps, null, {position: 'topleft'}).addTo(map);

 
