// Global multipoint GeoJSON  with multiple layers - Module 14.5.4

// // Create the map object with center at the San Francisco airport.
// let map = L.map('mapid', {
//     center: [40.7, -94.5],
//     zoom: 4
// });


// Module 14.5.2
// Add GeoJSON data.
let sanFranAirport =
{
    "type": "FeatureCollection", "features": [{
        "type": "Feature",
        "properties": {
            "id": "3469",
            "name": "San Francisco International Airport",
            "city": "San Francisco",
            "country": "United States",
            "faa": "SFO",
            "icao": "KSFO",
            "alt": "14",
            "tz-offset": "-8",
            "dst": "A",
            "tz": "America/Los_Angeles"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [-122.375, 37.61899948120117]
        }
    }
    ]
};


// // Grabbing our GeoJSON data.
// // Popup info using pointToLayer method
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//         return L.marker(latlng)
//         .bindPopup("<h2>" + feature.properties.name + "<br>"  + feature.properties.city+", "+ feature.properties.country+ "</h2>");
//        }
// }).addTo(map);

// // Grabbing our GeoJSON data.
// // Popup info using onEachFeature method
// L.geoJSON(sanFranAirport, {
//     // We turn each feature into a marker on the map.
//     onEachFeature: function(feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h3>" + "Airport code: " + feature.properties.faa + "<br>"  + "Airport name: " +feature.properties.name + "</h3>");
//     }
// }).addTo(map);




// Layers - Basic map config
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // Light background
    id: 'mapbox/streets-v11',
    // Dark background
    //id: 'mapbox/dark-v10',
    // Satelite background
    //id: 'mapbox/satellite-streets-v12',
    // Geo Light background
    //id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    // Light background
    //id: 'mapbox/streets-v11',
    // Dark background
    //id: 'mapbox/dark-v10',
    // Satelite background
    id: 'mapbox/satellite-streets-v12',
    // Geo Light background
    //id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Satellite: satelliteStreets
};

// Creat the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
});



// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// // Accessing the airport GeoJSON URL from my GitHub
// let airportData = "https://raw.githubusercontent.com/SusanFair/Mapping_Earthquakes/main/majorAirports.json";

// // Accessing the Toronto airline routes GeoJSON URL.
// let torontoData = "https://raw.githubusercontent.com/SusanFair/Mapping_Earthquakes/main/torontoRoutes.json";

// Accessing the Toronto neighbourhoods GeoJSON URL.
let torontoHoods = "https://raw.githubusercontent.com/SusanFair/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Alternate to adding the color and weight to the L.geoJSON, could set seperate myStyle
// Create a style for the lines.
let myStyle = {
    color: "#0c0ced",
    fillColor: "#ede60c",
    //opacity: 2
    weight: 2
}
// Grabbing our GeoJSON data.
// Popup info using GeoJson date from URL
d3.json(torontoHoods).then(function (data) {
    console.log(data);
    L.geoJSON(data, {
        style: myStyle,
        onEachFeature: function (features, layer) {
            layer.bindPopup("<h3>" + "Airline: " + features.properties.airline + "</h3> <hr> <h4>Destination: " + features.properties.dst + "</h4>")
        }
    }).addTo(map);
});