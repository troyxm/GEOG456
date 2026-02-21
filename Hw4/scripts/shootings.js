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
}).addTo(map);

// L.geoJSON(data, {
//     onEachFeature: onEachFeature
// }).addTo(map);

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
    var Cell_1 = document.createElement("td");
    var Cell_2 = document.createElement("td");
    var Cell_3 = document.createElement("td");
    var Cell_4 = document.createElement("td");
    var Cell_5 = document.createElement("td");

    var date = feature.properties.date;
    var state = feature.properties.state;
    var city = feature.properties.city;
    var name = feature.properties.name;
    var age = feature.properties.age;

    myRow.className = "input";

    Cell_1.innerHTML = date;
    Cell_2.innerHTML = state;
    Cell_3.innerHTML = city;
    Cell_4.innerHTML = name;
    Cell_5.innerHTML = age;
    
    myRow.append(Cell_1);
    myRow.append(Cell_2);
    myRow.append(Cell_3);
    myRow.append(Cell_4);
    myRow.append(Cell_5);

    myTable.append(myRow);


}

shootings.features.forEach(feature => popTable(feature));





