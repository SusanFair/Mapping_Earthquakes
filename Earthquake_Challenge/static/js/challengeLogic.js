// Add console.log to check to see if our code is working.
console.log("working");

// Layers - Basic map config
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  // Light background
  id: 'mapbox/streets-v11',
    tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  //Satellite streets background
  id: 'mapbox/satellite-streets-v12',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

// Deliverable 3: Add an Additional Map
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  // Outdoors
  id: 'mapbox/dark-v10',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  Street: streets,
  Satellite: satelliteStreets,
  Dark: dark
};

// Creat the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  // Changed center to better display major earthquakes globally
  center: [40.7, -94.5],
  //center: [14.4974, -14.4524],
  zoom: 3,
  layers: [streets]
});

// Create the earthquake layer for our map.
// 1. Add a 2nd layer group for the tectonic plate data.
let earthquakes = new L.layerGroup();
let tecktonicPlate = new L.LayerGroup();
let majorEarthquakes = new L.LayerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
// 2. Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  Earthquakes: earthquakes,
  TectonicPlates: tecktonicPlate,
  MajorEarthquakes: majorEarthquakes
};

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// Retrieve the earthquake GeoJSON data
let Earthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 2;
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
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function (features, layer) {
      layer.bindPopup("<h3>" + "Magnitude: " + features.properties.mag + "</h3> <hr> <h4>Location: " + features.properties.place + "</h4>")
    }
  }).addTo(earthquakes);
  //Then add the earthquake layer to our map.
  // Added all the markers to earthquakes layer, then earthquakes layer to map
  earthquakes.addTo(map);
});

// Create a legend control object.
let legend = L.control({
  position: "bottomright",
});

// Then add all the details for the legend.
legend.onAdd = function () {
  let div = L.DomUtil.create('div', 'info legend');
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];
  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
  return div;
};

legend.addTo(map);

// 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
let tecktonicPlateData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
d3.json(tecktonicPlateData).then(function (data) {
  console.log("tec data")
  console.log(data);
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: {
      color: "#ed0c0c",
      weight: 1.25
      },
    
      onEachFeature: function (features, layer) {
        layer.bindPopup("<h3>" + "Magnitude: " + features.properties.mag + "</h3> <hr> <h4>Location: " + features.properties.place + "</h4>")
    }
  }).addTo(tecktonicPlate);
});
  //Then add the tectonic plate layer to our map.
  tecktonicPlate.addTo(map);

// 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
// This function determines the color of the circle based on the magnitude of the earthquake.
// 5. Change the color function to use three colors for the major earthquakes based on the magnitude of the earthquake.
function getColorMajor(magnitude) {
  if (magnitude >= 6) {
    return "#ff0000";
  }
  if (magnitude > 5) {
    return "#ff751a";
  }
  return "#98ee00";
}

// 6. Use the function that determines the radius of the earthquake marker based on its magnitude.
function getRadiusMajor(magnitude) {
  if (magnitude >= 6) {
    return magnitude * 5;
  }
  if (magnitude > 5) {
    return magnitude * 3;
  }
  return magnitude * 1;
}

// 4. Use the same style as the earthquake data.
function styleInfoMajor(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColorMajor(feature.properties.mag),
    color: "#000000",
    radius: getRadiusMajor(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// 3. Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
let majorEarthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
d3.json(majorEarthquakeData).then(function (data) {
  console.log("major data")
  console.log(data);
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfoMajor,
        onEachFeature: function (features, layer) {
        layer.bindPopup("<h3>" + "Magnitude-Major: " + features.properties.mag + "</h3> <hr> <h4>Location: " + features.properties.place + "</h4>")
    }
    // 8. Add the major earthquakes layer to the map.
  }).addTo(majorEarthquakes);
});
  //Then add the tectonic plate layer to our map.
  majorEarthquakes.addTo(map);

