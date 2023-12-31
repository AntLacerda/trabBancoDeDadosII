let mapa;
let marker;

let center = {lat: -6.888463202449027, lng: -38.558930105104125};

async function initMap() {
  mapa = new google.maps.Map(document.getElementById("map"), {
    center: center,
    zoom: 14,
  });

  marker = new google.maps.Marker({
      map: mapa,
      position: center,
      draggable: true
  });

  mapa.addListener("click", (evt) => {
    addMarker(evt);
  });

  marker.addListener('position_changed', ()=>{
      mapa.setCenter(marker.position);
  });
}

function addMarker(evt){
    marker.setPosition(evt.latLng);
}

async function salvar(){
    const obj = {
        titulo: document.getElementById('descricao').value,
        tipo: document.getElementById('tipo').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        lat: marker.getPosition().lat(),
        lng: marker.getPosition().lng()
    };

    fetch("http://localhost:3000/pontos",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    }).then(response =>{alert('Salvo com sucesso')})
    .catch(error => {alert('Falha ao salvar!'); console.log(error);});    
}