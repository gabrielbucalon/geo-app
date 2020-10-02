let map;
let points = [];
let pointFound = [];
let infowindow;

async function initMap() {
  points = await getPoints();

  points.map((point) => {
    point.favorite = false;
  });

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: points[0].lat, lng: points[0].lng },
  });

  let image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  infowindow = new google.maps.InfoWindow();

  points.forEach((element, index) => {
    let marker = new google.maps.Marker({
      position: { lat: element.lat, lng: element.lng },
      map: map,
      icon: image,
    });
    setWindow(marker, element, index);
  });
}

function setWindow(marker, element, index) {
  google.maps.event.addListener(marker, "click", function (e) {
    infowindow.setContent(
      `<h3>Nome: ${element.name} </h3><br>
      ${
        element.cellphone
          ? `<h5 style = font-size: '14pt;
      font-weight: 700;'>Telefone: ${element.cellphone} </h5><br>`
          : ``
      } <br>
      <h5 style = font-size: '14pt; font-weight: 700;'> Inauguração: ${
        element.opening
      } </h5> <br>
      <button class="btn btn-success my-2 my-sm-0" onclick="favoriteOrDisfavor(${index})">Favoritar</button>
       <img class="image-modal-information" src=${element.img} alt=${
        element.name
      }></img>
       `
    );
    infowindow.open(map, marker);
  });
}

function favoriteOrDisfavor(index) {
  points[index].favorite = !points[index].favorite;
  points[index].favorite
    ? alert("Favoritado com sucesso :)")
    : alert("desfavoritado com sucesso :(");
}

async function getPoints() {
  return await fetch("src/data/points.json").then((response) =>
    response.json()
  );
}

function searchPoints() {
  pointFound = [];
  let valueSearch = document.getElementById("search").value;
  if (valueSearch === "") {
    initMap();
  } else {
    points.forEach((point) => {
      if (
        String(point.name).toLowerCase() ===
          String(valueSearch).toLowerCase() ||
        String(point.street).toLowerCase() ===
          String(valueSearch).toLowerCase() ||
        String(point.city).toLowerCase() ===
          String(valueSearch).toLowerCase() ||
        String(point.neighborhood).toLowerCase() ===
          String(valueSearch).toLowerCase()
      ) {
        pointFound.push(point);
      }
    });

    if (pointFound.length === 0) {
      initMap();
    } else {
      mountedMarkersToSearch();
    }
  }
}

function mountedMarkersToSearch() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: pointFound[0].lat, lng: pointFound[0].lng },
  });

  let image =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";

  infowindow = new google.maps.InfoWindow();

  pointFound.forEach((element, index) => {
    let marker = new google.maps.Marker({
      position: { lat: element.lat, lng: element.lng },
      map: map,
      icon: image,
    });
    setWindow(marker, element, index);
  });
}
