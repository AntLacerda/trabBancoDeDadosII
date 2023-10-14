let mapa;
let marker;
// let infoWindow;
// let novoPonto;

let center = {lat: -6.888463202449027, lng: -38.558930105104125};

async function initMap() {
    mapa = new google.maps.Map(document.getElementById("map"), {
      center: center,
      zoom: 14,
    });
  
    await fetch("http://localhost:3000/pontos").then((resp)=>{
      if (!resp.ok) {
        throw new Error('Erro ao acessar a API');
      }
      return resp.json();
    }).then((resp)=>{
      resp.map((ponto)=>{
        let latLng = {lat: ponto.lat, lng: ponto.lng}
  
        const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        `<h1 id="firstHeading" class="firstHeading">${ponto.titulo}</h1>` +
        '<div id="bodyContent">' +
        `<p><b>Tipo de ocorrência: </b>${ponto.tipo}` +
        `<p><b>Data: </b>${ponto.data} às ${ponto.hora}` +
        "</div>" +
        "</div>";
  
        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
          arialLabel: ponto.titulo
        })
  
        const novoPonto = new google.maps.Marker({
          position: latLng,
          map: mapa,
          draggable: false,
          title: ponto.titulo
        })
        
        novoPonto.addListener("click", ()=>{
          infoWindow.open({
            anchor: novoPonto,
            map: mapa
          });
        });
      });
    });
  }
