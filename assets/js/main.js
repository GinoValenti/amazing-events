// OBETENEMOS EL CONTENEDOR DE LAS CARDS

const contenedorCards = document.getElementById("card-container")




async function getEvents(){
    try {
        let response = await fetch ("https://mh-amazing.herokuapp.com/amazing")
        let events = await response.json()
        var eventsData = events.events
        console.log(eventsData);
        
    } catch (error) {
        console.log(error);
    }
    eventsData.forEach(createCard)

    const categoriasCheckbox = new Set(eventsData.map(evento => evento.category))

    categoriasCheckbox.forEach(createCheckbox)

    console.log(categoriasCheckbox);
    
    let checkBoxClass = Array.from(document.querySelectorAll(".checkBoxClass"))
    
    checkBoxClass.forEach(checkbox => checkbox.addEventListener('click', filtrarCards))

    searchId.addEventListener('input',filtrarCards)

    function filtrarCards(){
        let checkboxFiltrados = checkboxFilters(eventsData)
        let searchFiltrados = searchFilters(checkboxFiltrados,searchId.value)
        if(searchFiltrados.length !== 0 ){
            contenedorCards.innerHTML = ``
        }
        searchFiltrados.forEach(createCard)
    }
    function checkboxFilters(evento){
        let checkboxFiltering = checkBoxClass.filter(check => check.checked).map(check => check.value)
        if (checkboxFiltering.length !== 0){
            checkboxFiltering = evento.filter(event => checkboxFiltering.includes(event.category))
            return checkboxFiltering
        }
        return evento
    
    }

}
getEvents()

// -------------------------------------  CHECKBOX  ----------------------------------------------

const contenedorChecks = document.getElementById('checkbox-container')





function createCheckbox(x){
    contenedorChecks.innerHTML += `
    <label class="redondos">
        
        <input class="checkbox checkBoxClass" value="${[x]}" type="checkbox">
  
        <div class="checkmark"><span class="category">${[x]}</span></div>
      </label>
      `
}

let checkBoxClass = Array.from(document.querySelectorAll(".checkBoxClass"))

let searchId = document.getElementById('searchId')
// ----------------------------------- CHEKBOX & SEARCH Filtering ----------------------------------------------


checkBoxClass.forEach(checkbox => checkbox.addEventListener('click', filtrarCards))

searchId.addEventListener('input',filtrarCards)



function searchFilters(array, texto){
    let searFiltering = array.filter(event => event.name.toLowerCase().includes(texto.toLowerCase()))
    if(searFiltering.length === 0){
        contenedorCards.innerHTML = `
        <div style="min-height:50vh;">
        <img class="error"  height="400"width="350" src="./assets/img/4044.png" alt="page not found">
        </div>
        `
        return []
    }
    return searFiltering
}

function createCard(x){
    contenedorCards.innerHTML += `
    <div class="card" style="width: 16rem;" data-aos="fade-up">
<img src="${x.image}" class="card-img-top images" alt="${x.name}">
<div class="category-div">
<span class="tag tag-teal">${x.category}</span>
</div>
<div class="card-body">
  <h5 class="titlee">${x.name}</h5>
  <p> ${x.date.slice(0,10)}</p>
  <p class="card-text "> ${x.description} Only for ${x.price}$ </p>
  <a href="pages/details.html?id=${x.id}"><button class="card-button">More info</button></a>
  <a href="pages/details.html?id=${x.id}"><button class="movile-button">More info</button></a>
</div>
</div>
    `
    
}