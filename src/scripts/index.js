let map;

async function initMap() {
  let points = await getPoints();

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: points[0].lat, lng: points[0].lng },
  });

  var image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  points.forEach((element) => {
    var beachMarker = new google.maps.Marker({
      position: { lat: element.lat, lng: element.lng },
      map: map,
      icon: image,
    });
  });
}

function getPoints() {
  return fetch("src/data/points.json").then((response) => response.json());
}
