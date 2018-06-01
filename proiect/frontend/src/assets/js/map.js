var defaultPos = {lat: 47.17495, lng: 27.5579782};
var googleMap;
var iconsPath = 'icons/';
var infoWindow;
var vectorMarker = [];
var addMarker = [];


function initMap() {
  googleMap = new google.maps.Map(document.getElementById('map'), {
    center: defaultPos,
    zoom: 13
  });
  infoWindow = new google.maps.InfoWindow;
};

function zoomMap(pos, zoom) {
  googleMap.setCenter(pos);
  googleMap.setZoom(zoom);

}

function CreateMarker(price, interval, description, link, pos, icn) {
  var marker = new google.maps.Marker({
    position: pos,
    price: price,
    interval: interval,
    description: description,
    link: link,
    icon: icn,
    map: googleMap
  });
  vectorMarker.push(marker);
  return marker;
}

function Geolocation(condition) {
  if (condition) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var icn = iconsPath + 'geolocation-marker.png';
        CreateMarker(pos, 'Locatia dumneavoastra.', icn, "geolocation");
        googleMap.setCenter(pos);
        googleMap.setZoom(15);
      }, function () {
        alert("Error: Serviciul Geolocation a esuat. Acesta a fost blocat.");
      });
    } else {
      alert("Error: Browser-ul dumneavoastra nu suporta geolocation.")
    }
  }
  else {
    setMapOnAll(null, geolocationMarker);
    geolocationMarker = [];
  }
}

function CreatePopUpMarker(marker, link, source) {
  var contentString = "<div style='font-size: 15px;font-weight:600;'>Interval:"
    + "<span style='font-size: 15px;font-weight:400;'>" + marker.interval + "</span>"
    + "</div>" + "<div style='font-size: 15px;font-weight:600;'>Price:"
    + "<span style='font-size: 15px;font-weight:400;'>" + marker.price + "</span>"
    + "</div>" + "<div style='font-size: 15px;font-weight:600;'>Link:"
    + "<span style='font-size: 15px;font-weight:400;'><a href='" + marker.link + "'> CLICK! </a></span>"
    + "</div>" + "<div style='font-size: 15px;font-weight:600;'>Description:"
    + "<div style='font-size: 15px;font-weight:400;'>" + marker.description + "</div>";
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function () {
    infowindow.open(googleMap, marker);
  });
}

function insertAd() {
  var desc = document.getElementById("desc").value;
  var price = document.getElementById("price").value;
  var interval = document.getElementById("interval").value;
  var lat = document.getElementById("lat").value;
  var long = document.getElementById("long").value;

  // xmlhttp = new XMLHttpRequest();
  // var url = "localhost:5000/addarticle?lat=" + lat + "&long=" + long +"&descriere=" + desc + "&pret=" + price + "&interval=" + interval;
  // xmlhttp.open("POST", url, true);
  // xmlhttp.send();
  // xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
  //   if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
  //     alert(xmlhttp.responseText);
  //     getPlaces();
  //   }
  // };

  $.ajax({
    contentType: 'application/json',
    data: null,
    dataType: 'json',
    success: function (data) {
      alert('ADAUGAT');
      getPlaces();
    },
    error: function () {
      app.log("Device control failed");
    },
    processData: false,
    type: 'POST',
    url: "api/addarticle?lat=" + lat + "&long=" + long +"&descriere=" + desc + "&pret=" + price + "&interval=" + interval
  });
}

function CreatePopUpMarkerNew(marker) {
  console.log(marker.position.lat());
  console.log(marker.position.lng());
  var contentString = "<form action='ceva'>" +
    "<input id='desc' type='text' placeholder='Description' required='required'/>" +
    "<div><input id='interval' type='text' placeholder='Interval' required='required'/></div>" +
    "<div><input id='price' type='text' placeholder='Price' required='required'/></div>" +
    "<div><input id='lat' type='text' placeholder='Latitude' value='" + marker.position.lat() + "' required='required'/></div>" +
    "<div><input id='long' type='text' placeholder='Longitudine' value='" + marker.position.lng() + "'  required='required'/></div>" +
    "<div><input style='cursor:pointer' type='button' value='Adauga anunt' onclick='insertAd()'/></div>" +
    "</form>";
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function () {
    infowindow.open(googleMap, marker);
  });
}

function setMapOnAll(map, markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function populateMap(map, add) {
  for (var mapItem in map) {
    var pos = new google.maps.LatLng(
      map[mapItem].latitude ? map[mapItem].latitude : 0,
      map[mapItem].longitude ? map[mapItem].longitude : 0
    );
    var description = map[mapItem].description;
    var interval = map[mapItem].interval;
    var price = map[mapItem].price;
    var link = map[mapItem].link;
    if (add == undefined) {
      // var icn = iconsPath + 'parking.png';
      var icn = 'https://imgur.com/r5bzL3L.png';
    }
    else {
      // var icn = iconsPath + 'parking_add.png';
      var icn = 'https://imgur.com/5NL2cE8.png';
    }
    var marker = CreateMarker(price, interval, description, link, pos, icn);
    var urlPhoto = map[mapItem].link;
    CreatePopUpMarker(marker, urlPhoto);
  }
}

window.onload = function () {

  getPlaces();

  // populateMap([{latitude: "47.1734", longitude: "27.5579782", name: "jmeq", link: "ceva"}]);
  // populateMap([{latitude: "47.17434", longitude: "27.55523423", name: "jmeq", link: "ceva"}]);
  // populateMap([{latitude: "47.172435", longitude: "27.5569782", name: "jmeq", link: "ceva"}]);
  // populateMap([{latitude: "47.12345", longitude: "27.55793452", name: "jmeq", link: "ceva"}]);
  // populateMap([{latitude: "47.17495", longitude: "27.55234782", name: "jmeq", link: "ceva"}]);
  // populateMap([{latitude: "47.17495", longitude: "27.55349782", name: "jmeq", link: "ceva"}]);
  // populateMap([{latitude: "47.17495", longitude: "27.55349782", name: "jmeq", link: "ceva"}], 'asdc');
  google.maps.event.addListener(googleMap, 'click', function (event) {
    // var icn = iconsPath + 'parking_add.png';
    var icn = 'https://imgur.com/5NL2cE8.png';
    console.log(event.latLng);
    placeMarker(event.latLng, icn);
  });
};

function getPlaces() {
  arrayPlaces = [];

  const http = new XMLHttpRequest();

  http.open("GET", "api/articles");
  http.send();

  http.onload = () =>
  {
    arrayPlaces = JSON.parse(http.responseText);
    console.log(arrayPlaces);
    for (i = 0; i < arrayPlaces.length; i++) {
      populateMap([{
        latitude: arrayPlaces[i].lat,
        longitude: arrayPlaces[i].long,
        price: arrayPlaces[i].price,
        interval: arrayPlaces[i].interval,
        description: arrayPlaces[i].description,
        link: arrayPlaces[i].link
      }]);
    }
  }
}


function placeMarker(location, icn) {
  if (addMarker[0] == undefined) {
    var marker = new google.maps.Marker({
      position: location,
      icon: icn,
      map: googleMap,
      title: 'Aurashe'
    });
    CreatePopUpMarkerNew(marker);
    addMarker.push(marker);
  }
  else {
    addMarker[0].setPosition(location);
  }
  return marker;
}
