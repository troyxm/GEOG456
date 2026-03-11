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

// --- HISTOGRAM MATCHING FUNCTIONS ---
// Code adapted from: https://medium.com/google-earth/histogram-matching-c7153c85066d

// 1. Helper Function: Creates a lookup table to map pixel values from the source to the target.
var lookup = function (sourceHist, targetHist) {
  // Extract and normalize the pixel values and their frequency counts for the source image.
  var sourceValues = sourceHist.slice(1, 0, 1).project([0]);
  var sourceCounts = sourceHist.slice(1, 1, 2).project([0]);
  sourceCounts = sourceCounts.divide(sourceCounts.get([-1]));

  // Extract and normalize the pixel values and their frequency counts for the target image.
  var targetValues = targetHist.slice(1, 0, 1).project([0]);
  var targetCounts = targetHist.slice(1, 1, 2).project([0]);
  targetCounts = targetCounts.divide(targetCounts.get([-1]));

  // For every pixel value in the source, find the corresponding value in the target
  // that represents the same cumulative probability (percentile).
  var lookup = sourceCounts.toList().map(function (n) {
    var index = targetCounts.gte(n).argmax();
    return targetValues.get(index);
  });

  // Return an object pairing the original values (x) with their new matched values (y).
  return { x: sourceValues.toList(), y: lookup };
};

// 2. Main Function: Matches the histogram of the source image to the target image.
var histogramMatch = function (sourceImg, targetImg) {
  var geom = sourceImg.geometry();

  // Set up the parameters to generate histograms using Earth Engine's Reducer.
  var args = {
    reducer: ee.Reducer.autoHistogram({ maxBuckets: 256, cumulative: true }),
    geometry: geom,
    scale: 30, // Scale at which to calculate the histogram (meters).
    maxPixels: 65536 * 4 - 1, // Max number of pixels to process to avoid memory limits.
    bestEffort: true, // If the area is too large, it will calculate at a lower resolution to fit in memory.
  };

  // Generate the histograms for both images within the region.
  var source = sourceImg.reduceRegion(args);
  var target = targetImg.updateMask(sourceImg.mask()).reduceRegion(args);

  // Apply the lookup table interpolation to each band (Red, Green, Blue) individually.
  // Then stitch them back together into a single image using ee.Image.cat().
  return ee.Image.cat(
    sourceImg
      .select(["R"])
      .interpolate(lookup(source.getArray("R"), target.getArray("R"))),
    sourceImg
      .select(["G"])
      .interpolate(lookup(source.getArray("G"), target.getArray("G"))),
    sourceImg
      .select(["B"])
      .interpolate(lookup(source.getArray("B"), target.getArray("B")))
  );
};

// Apply the function: Match the colors of the 2012 image (before) to the 2020 image (after).
var result = histogramMatch(befImg, aftImg);

// Center the map on the area of interest.
Map.setCenter(-78.8802, 42.887, 15);

// Add both the 'After' and 'Before' images as map layers so they can be visually compared.
Map.addLayer(aftImg, trueColorVis, yearAfter);
Map.addLayer(befImg, trueColorVis, yearBefore);
Map.addLayer(result, trueColorVis, "Histogram Matched " + yearBefore); // 2011 Color-Corrected Image
