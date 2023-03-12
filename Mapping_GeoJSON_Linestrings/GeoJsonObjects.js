// Geometry Object - 
// Single set of coordinates
"geometry":{
    "type":"Point",
    "coordinates": [-118.4, 33.9]
    }

// MultiPoint - an array of point coordinates
"geometry":{
    "type":"MultiPoint",
    "coordinates": [-118.4, 33.9], [-118.5, 34.0]
    }

// LineString - an arry of point coordinates
"geometry":{
    "type":"LineString",
    "coordinates": [[-118.4, 33.9],[-122.4, 37.6]]
    }

// MultiString - an arry of LineString coordinates
"geometry":{
    "type":"MultiLineString",
    "coordinates":
       [[-118.4, 33.9],[-106.4, 31.8]],
       [[-118.4, 33.9],[-123.2, 44.1]]
    }

// Polygon - an array of LineString coordinates
"geometry": {
    "type": "Polygon",
     "coordinates":
    [
     [ [ -122.446, 37.861 ], [ -122.438, 37.868 ], [ -122.430, 37.872 ] ]
    ]

// MultiPolygon - an arry of polygon coordinates
"geometry": {
    "type": "MultiPolygon",
    "coordinates": [
     [ [ -122.446, 37.861 ], [ -122.438, 37.868 ], [ -122.430, 37.872 ] ],
     [ [ -122.378, 37.826 ], [ -122.377, 37.830 ], [ -122.369, 37.832 ] ]
 ]

 // GeometryCollection - geometry array.
 {
    "type": "GeometryCollection",
    "geometries": [
        {
          "type":"Point",
        "coordinates": [-118.4, 33.9]
       }
        },
        {
           "type":"LineString",
           "coordinates": [
              [-118.4, 33.9],[-122.4, 37.6]
            ]
        }
    ]
 }

 // Features Object -  contains a geometry object 
 {
    type: "Feature",
    properties: {
    mag: 1.88,
    place: "6km SE of Pahala, Hawaii",
    time: 1573766377230,
    type: "earthquake",
    title: "M 1.9 - 6km SE of Pahala, Hawaii"
    },
    geometry: {
    type: "Point",
    coordinates: [
    -155.4329987,
    19.1634998
    ]},
  }

  // FeatureCollectionObject - contains an array of feature objects
  {"type":"FeatureCollection","features":
[
  {
    "type":"Feature","properties":{
"airline":"AA","airline_id":"24","src":"LAX","dst":"ABQ","dst_id":"4019","stops":"0","equipment":"CRJ CR7"},"geometry":{
"type":"LineString",
"coordinates":[[-118.4079971,33.94250107],[-106.609001,35.040199]]}
},
{
"type":"Feature","properties":{
"airline":"AA","airline_id":"24","src":"LAX","src_id":"3484","dst":"ANC","dst_id":"3774","codeshare":"Y","stops":"0","equipment":"737"},"geometry":{
"type":"LineString",
"coordinates":[[-118.4079971,33.94250107],[-149.99600219726562,61.174400329589844]]}
  },
{
  "type":"Feature","properties":{
"airline":"AA","airline_id":"24","src":"LAX","src_id":"3484","dst":"AUS","dst_id":"3673","codeshare":"","stops":"0","equipment":"M83 738"},"geometry":{
"type":"LineString",
"coordinates":[[-118.4079971,33.94250107],[-97.6698989868164,30.194499969482422]]}
  }
]

}

