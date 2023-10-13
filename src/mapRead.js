let mapa;
let marker;

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
        let latLng = {lat: parseFloat(ponto.lat), lng: parseFloat(ponto.lng)}
  
        const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        `<h1 id="firstHeading" class="firstHeading">${ponto.titulo}</h1>` +
        '<div id="bodyContent">' +
        `<p><b>Tipo de ocorrência: </b>${ponto.tipo}` +
        `<p><b>Data: </b>${ponto.data} às ${ponto.hora}` +
        `<p><b>Tipo de ocorrência: </b>${ponto.tipo}` +
        "</div>" +
        "</div>";
  
        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
          arialLabel: ponto.titulo
        })
  
        let novoPonto = new google.maps.Marker({
          position: latLng,
          map: mapa,
          draggable: false,
          title: ponto.titulo
        }).addListener("click", ()=>{
          infoWindow.open({
            anchor: infoWindow,
            map: mapa
          });
        });
      });
    });
  }