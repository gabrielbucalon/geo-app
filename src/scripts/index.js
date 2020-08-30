let map;
let points = [];
let pointFound;

async function initMap() {
  points = await getPoints();
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: { lat: points[0].lat, lng: points[0].lng },
  });

  var image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
  debugger;
  if (pointFound) {
    var beachMarker = new google.maps.Marker({
      position: { lat: pointFound.lat, lng: pointFound.lng },
      map: map,
      icon: image,
    });
  } else {
    points.forEach((element) => {
      var beachMarker = new google.maps.Marker({
        position: { lat: element.lat, lng: element.lng },
        map: map,
        icon: image,
      });
    });
  }
}

function getPoints() {
  return fetch("src/data/points.json").then((response) => response.json());
}

function searchPoints() {
  let valueSearch = document.getElementById("search").value;

  pointFound = points.find((point) => point.name === valueSearch);

  initMap();
}
