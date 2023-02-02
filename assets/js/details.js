const contenedorDetails = document.getElementById('detail-container')

async function detailsId(){

  let id = location.search.slice(4)
  
  try{
    var detailsJson = await fetch(`https://63bec0a6f5cfc0949b601cc9.mockapi.io/mindhub/amazing-events`)
    detailsJson = await detailsJson.json()
    var eventsData = detailsJson
console.log(eventsData);
    }catch(error){
      console.log(error)
    }
    
    let eventDetails = eventsData.filter(event => id == event._id)
    eventDetails = eventDetails[0]
    createCard(eventDetails)
  
  }
  
  
  
  function createCard(event){
    contenedorDetails.innerHTML += `
    <div class="card" style="width: 25rem; height: 35em">
    <img src="${event.image}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">${event.description} Only for ${event.price}$ </p>
    <p class="card-text">Place: ${event.place}</p>
    <p class="card-text">Date: ${event.date.slice(0,10)}</p>
    </div>
    </div>
    `
  }
  detailsId()