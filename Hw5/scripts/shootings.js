var map = L.map('mapid').setView([37.0902, -98.7129], 3);

var cartoMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

// filter data to exclude null geometries <--- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter


// return array of features with non-null geometries
function isNull(feature) {
    return feature.geometry !== null;
}

// sets data.features to an array of features with non-null geometries to be used by var geojson
data.features = data.features.filter(isNull);


var geojson = L.geoJSON(data.features[0], {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 4,
      fillColor: "#ff7800",
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8,
    });
  },
  onEachFeature: onEachFeature, 
}).addTo(map);



var myTable = document.getElementById("shootings-table");

function myFunction(e) {
    document.querySelectorAll('.input');
    popTable(e.target.feature);
}


function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties["date"]) {
        var customPopup = `
        <div class ="popup-container">
            <h3 class = "date"> Date: ${feature.properties["date"]}</h3>
            <h3 class = "name"> Victim: ${feature.properties["name"]}</h3>
            <h3 class = "state"> State: ${feature.properties["state"]}</h3>
            <h3 class = "city"> City: ${feature.properties["city"]}</h3>
        `;
        layer.bindPopup(customPopup);
    }
}

function moveSlider(value) {
    map.removeLayer(geojson);
    document.getElementById('daYear').innerHTML = 'Date: ' + data.features[value].properties.date
    geojson = L.geoJson(data.features[value], {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 4,
                fillColor: "#ff7800",
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: onEachFeature
    })
    map.addLayer(geojson);
}

function popTable(feature) {
    var myRow = document.createElement("tr");
    var cell_1 = document.createElement("td");
    var cell_2 = document.createElement("td");
    var cell_3 = document.createElement("td");
    var cell_4 = document.createElement("td");
    var cell_5 = document.createElement("td");
    var cell_6 = document.createElement("td");

    var date = feature.properties.date;
    var state = feature.properties.state;
    var city = feature.properties.city;
    var name = feature.properties.name;
    var age = feature.properties.age;
    var body_camera = feature.properties.body_camera;

    myRow.className = "input";

    cell_1.innerHTML = date;
    cell_2.innerHTML = state;
    cell_3.innerHTML = city;
    cell_4.innerHTML = name;
    cell_5.innerHTML = age;
    cell_6.innerHTML = body_camera;

    cell_6.style.backgroundColor = getBackgroundColor(body_camera);
    //cell_6.style.className = getClassName(body_camera);

    myRow.append(cell_1);
    myRow.append(cell_2);
    myRow.append(cell_3);
    myRow.append(cell_4);
    myRow.append(cell_5);
    myRow.append(cell_6);
    myTable.append(myRow);


}


// assigning background color and class name based on body camera value (true or false)

// 1. If var body_camera === true, then color = green, otherwise color = red

function getBackgroundColor(d) {
    return d === true ? '#26b326dc' : '#e74141d7';
}

// 2. If var body_camera === true, then class name = Yes, otherwise class name = No

// function getClassName(d) {
//     return d === true ? 'Yes' : 'No';
// }



moveSlider(0); // Start the map with the first feature
window.onload = function () {
    document.getElementById('dateSlider').value = 0; // Set the slider to the first feature on page load
}

data.features.forEach(feature => popTable(feature)); // display table




// use TableforEach.html; table2.html for help
// use blackmartin.html; hurrican.html for help with slider and popups (FOUND in slider_examples)


// FIX: 
// 1. Slider should show all points/shootings that occur on selected date (DONE)

// Number of shootings in the dataset with null : 10429
// Number of shootings in the dataset w/o non-null geometries: 9289 <-- Use this one
