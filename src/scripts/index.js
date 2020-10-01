let map;
let points = [];
let pointFound;
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
  if (pointFound) {
    let marker = new google.maps.Marker({
      position: { lat: pointFound.lat, lng: pointFound.lng },
      map: map,
      icon: image,
    });
    setWindow(marker, pointFound);
  } else {
    points.forEach((element, index) => {
      let marker = new google.maps.Marker({
        position: { lat: element.lat, lng: element.lng },
        map: map,
        icon: image,
      });
      setWindow(marker, element, index);
    });
  }
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
      } 
       <img src=${element.img} alt=${element.name}></img>
       <br> ` +
        ' <button class="btn btn-success my-2 my-sm-0" onclick="favoriteOrDisfavor(' +
        index +
        ')">Favoritar</button> '
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
  let valueSearch = document.getElementById("search").value;

  pointFound = points.find((point) => point.name === valueSearch);

  initMap();
}
