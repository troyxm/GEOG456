var map = L.map('mapid').setView([37.0902, -98.7129], 3);

var cartoMap = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 20
}).addTo(map);

L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
            radius: 4,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        });
    }
    //onEachFeature: onEachFeature
}).addTo(map);



var myTable = document.getElementById("shootings-table");

function myFunction(e) {
    document.querySelectorAll('.input');
    popTable(e.target.feature);
}

function onEachFeature(feature, layer) {
    layer.on({ mouseover: myFunction })
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
    cell_6.style.className = getClassName(body_camera);

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

function getClassName(d) {
    return d === true ? 'Yes' : 'No';
}


data.features.forEach(feature => popTable(feature)); // display table

// data.features.forEach(feature => popTable(feature)); // commmenting out this line will make the table only populate when you hover over a point, instead of populating the entire table at once.



// use Table)forEach.html; table2.html for help


// links used
// https://leafletjs.com/examples/geojson/
