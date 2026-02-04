var BasemapAT_highdpi = L.tileLayer('https://mapsneu.wien.gv.at/basemap/bmaphidpi/{type}/google3857/{z}/{y}/{x}.{format}', {
    maxZoom: 19,
    attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>',
    type: 'normal',
    format: 'jpeg',
    bounds: [[46.35877, 8.782379], [49.037872, 17.189532]]
});
var Stadia_StamenTonerLines = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_lines/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
});
var Stadia_StamenTonerLabels = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
});


var stadiaSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
});

var Stadia_StamenTerrain = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.{ext}', {
    minZoom: 0,
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
});


// 1. Define two solid Base Layers
var alidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; Stadia Maps'
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
});

// 2. Define your Vector Layer (The one you already have)
var organizationsLayer = L.geoJSON(organizations, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: mapIcon });
    },
    onEachFeature: onEachFeature
});

// 3. Define the Labels as an extra Overlay
var tonerLabels = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_toner_labels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; Stadia Maps'
});

// 4. Create the Control
var baseMaps = {
    "Alidade Smooth": alidadeSmooth,
    "OpenStreetMap": osm
};

var overlayMaps = {
    "Organizations": organizationsLayer,
    "Street Labels": tonerLabels
};

// 5. Initialize Map
var map = L.map('mapid', {
    center: [35.1781, -80.8070],
    zoom: 11,
    layers: [alidadeSmooth, organizationsLayer]
});

L.control.layers(baseMaps, overlayMaps).addTo(map);


var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT
};

var overlayMaps = {
    "Cities": cities
};

var layersControl = L.control.layers(baseMaps, overlayMaps).addTo(map);



// 1. Define Icon
var mapIcon = L.icon({
    iconUrl: '../data/pin.png',
    iconSize: [25, 25],
    popupAnchor: [0, 0]
});

// 2. Define Tile Layers (MUST happen before initializing the map)
var Stadia_StamenTerrain = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
    minZoom: 0,
    maxZoom: 18,
    attribution: '&copy; Stadia Maps & Stamen Design'
});

var Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; Stadia Maps'
});

// 3. Define Functions
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties["Company Name"]) {
        layer.bindPopup("<b>Company Name:</b> " + feature.properties["Company Name"] +
            "<br><b>Street Address:</b> " + feature.properties["Street Address"] +
            "<br><b>City:</b> " + feature.properties["City"] +
            "<br><b>Line of Business:</b> " + feature.properties["Line of Business"]);
    }
}

// 4. Define Vector Layer (MUST happen before initializing the map)
var mapID = L.geoJSON(organizations, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: mapIcon });
    },
    onEachFeature: onEachFeature
});

// 5. Initialize Map (Now that layers exist, we can use them)
var map = L.map('mapid', {
    center: [35.1781, -80.8070],
    zoom: 11,
    layers: [Stadia_StamenTerrain, mapID] // Start with one base map and your data
});

// 6. Add Layer Control
var baseMaps = {
    "Stamen Terrain": Stadia_StamenTerrain,
    "Stadia Outdoors": Stadia_Outdoors
};

var overlayMaps = {
    "Organizations": mapID
};

L.control.layers(baseMaps, overlayMaps).addTo(map);


// 1. Link your new data file in the <head>
// <script src="../data/hospitals.js"></script>

// 2. In your map script, load the GeoJSON layer
L.geoJSON(hospitalData, {
    // Custom icon for each point
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: stadiumIcon });
    },
    // Required: Add a pop-up with an image and hyperlink for each feature
    onEachFeature: function (feature, layer) {
        // Access properties from your shapefile's attribute table
        // Example: feature.properties.NAME
        var popupContent = `
            <h3>${feature.properties.NAME || "Hospital"}</h3>
            <img src="../data/Real_stadium.jpeg" width="200px" />
            <br/>
            <a href="https://www.google.com/search?q=${feature.properties.NAME}" target="_blank">More Info</a>
        `;
        layer.bindPopup(popupContent); //
    }
}).addTo(map);


// --- REPLACE EVERYTHING BELOW THE DATA WITH THIS ---

// 1. Define Icon
var mapIcon = L.icon({
    iconUrl: '../data/pin.png',
    iconSize: [25, 25],
    popupAnchor: [0, 0]
});

// 2. Define Tile Layers (Base Maps)
var Stadia_StamenTerrain = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png', {
    minZoom: 0,
    maxZoom: 18,
    attribution: '&copy; Stadia Maps & Stamen Design'
});

var Stadia_Outdoors = L.tileLayer('https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png', {
    minZoom: 0,
    maxZoom: 20,
    attribution: '&copy; Stadia Maps'
});

// 3. Define Popup Function
function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties["Company Name"]) {
        layer.bindPopup("<b>Company Name:</b> " + feature.properties["Company Name"] +
            "<br><b>Street Address:</b> " + feature.properties["Street Address"] +
            "<br><b>City:</b> " + feature.properties["City"] +
            "<br><b>Line of Business:</b> " + feature.properties["Line of Business"]);
    }
}

// 4. Create Vector Layer (Points)
var mapID = L.geoJSON(organizations, {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: mapIcon });
    },
    onEachFeature: onEachFeature
});

// 5. Initialize Map
// FIX: We include 'mapID' here so the points show up immediately.
// We only include ONE base map (Terrain) so they don't overlap.
var map = L.map('mapid', {
    center: [35.1781, -80.8070],
    zoom: 11,
    layers: [Stadia_StamenTerrain, mapID]
});

// 6. Add Layer Control
var baseMaps = {
    "Stamen Terrain": Stadia_StamenTerrain,
    "Stadia Outdoors": Stadia_Outdoors
};

var overlayMaps = {
    "Organizations": mapID
};

// FIX: This is the command that was missing!
L.control.layers(baseMaps, overlayMaps).addTo(map);