/* =====================
Leaflet Configuration
===================== */

var map = L.map('map', {
  center: [25.779867, -80.223289],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var dataset = "https://raw.githubusercontent.com/sofia-hu/692mid/master/data/miami.geojson"
var featureGroup;

var myStyle = function(feature) {
  var collColor;
  if (feature["properties"]["POP2010"]>3000){
    collColor = 'red'
  };
  return {fillColor: collColor};
};

var myFilter = function(feature) {
  if(feature["properties"]["POP2010"]<3000){
      return false;
  }
  else{
    return true;
  };
};

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    featureGroup = L.geoJson(parsedData,{
      style: myStyle,
      filter: myFilter
    }
  ).addTo(map);
  });
});
