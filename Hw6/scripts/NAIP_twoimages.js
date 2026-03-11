

// You need to create a geometry, otherwise this will not work.

// Define the two years we want to compare.
var yearBefore = "2011"; // represent text to change the data later on easier
var yearAfter = "2022"; // 

// Load and filter the 'Before' dataset (2010`).
// Filters by the user-drawn 'geometry' boundary and the date range of 2012.
var datasetBefore = ee
  .ImageCollection("USDA/NAIP/DOQQ")
  .filter(ee.Filter.bounds(geometry)) // makes it faster 
  .filter(ee.Filter.date(yearBefore + "-01-01", yearBefore + "-12-31"));

// Load and filter the 'After' dataset (2020).
// Filters by the user-drawn 'geometry' boundary and the date range of 2020.
var datasetAfter = ee
  .ImageCollection("USDA/NAIP/DOQQ")
  .filter(ee.Filter.bounds(geometry))
  .filter(ee.Filter.date(yearAfter + "-01-01", yearAfter + "-12-31"));

// Process the 'Before' imagery: select RGB bands, reduce to median, and clip to the geometry.
var befImg = datasetBefore.select(["R", "G", "B"]);
befImg = befImg.median().clip(geometry);

// Process the 'After' imagery: select RGB bands, reduce to median, and clip to the geometry.
var aftImg = datasetAfter.select(["R", "G", "B"]);
aftImg = aftImg.median().clip(geometry);

// Define standard 8-bit visualization parameters.
var trueColorVis = {
  min: 0,
  max: 255,
};

// Center the map on the area of interest.
Map.setCenter(-78.8802, 42.887, 15);

// Add both the 'After' and 'Before' images as map layers so they can be visually compared.
Map.addLayer(aftImg, trueColorVis, yearAfter);
Map.addLayer(befImg, trueColorVis, yearBefore);
