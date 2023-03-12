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
    center: [39.5, -98.5],
    zoom: 2,
    layers: [streets]
});



// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// // Accessing the airport GeoJSON URL from my GitHub
// let airportData = "https://raw.githubusercontent.com/SusanFair/Mapping_Earthquakes/main/majorAirports.json";

// // Accessing the Toronto airline routes GeoJSON URL.
// let torontoData = "https://raw.githubusercontent.com/SusanFair/Mapping_Earthquakes/main/torontoRoutes.json";

// // Accessing the Toronto neighbourhoods GeoJSON URL.
// let torontoHoods = "https://raw.githubusercontent.com/SusanFair/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Retrieve the earthquake GeoJSON data
let Earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Alternate to adding the color and weight to the L.geoJSON, could set seperate myStyle
// Create a style for the lines.
// let myStyle = {
//     color: "#0b0ced",
//     //fillColor: "#ede60c",
//     //opacity: 2
//     weight: 2
// }

// Module 14.6.2
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 3;
  }

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }


// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
// Grabbing our GeoJSON data.
// Popup info using GeoJson date from URL
d3.json(Earthquakes).then(function (data) {
    console.log(data);
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleInfo,
        onEachFeature: function (features, layer) {
            layer.bindPopup("<h3>" + "Magnitude: " + features.properties.mag + "</h3> <hr> <h4>Location: " + features.properties.place + "</h4>")
        }
    }).addTo(map);
});


