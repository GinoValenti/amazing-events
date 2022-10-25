
//table 1
async function getStats1(id){
    let response = await fetch ( "https://mh-amazing.herokuapp.com/amazing?time=past")
    let data = await response.json()
    let events = data.events
   events.map(x =>{
    x.gain = x.assistance * x.price

    x.percent = (100 * x.assistance / x.capacity).toFixed(2)
})

    // ordena de menor a mayor por porcentaje
    events = events.sort((event1,event2)=> event1.percent - event2.percent)
    /* console.log(events); */
    //agarro el percent minimo
    let minPercent =events[0]
   
      //agarro el percent maximo
    let maxPercent = events[events.length-1]

       // ordena de menor a mayor por capacidad
    events = events.sort((event1,event2)=> event1.capacity - event2.capacity)
    let maxCapacity = events[events.length-1]
    printTable1(minPercent,maxPercent,maxCapacity,id)

  
  
}
getStats1("table1")
const printTable1 = (minP,maxP,maxC,id) => {
    document.querySelector(`#${id}`).innerHTML =
    `
    <tr class="table-light d-flex justify-content-center">
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3 p-3">${maxP.name}</th>
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3 p-3">${minP.name}</th>
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3 p-3">${maxC.name}</th>
    </tr>
    <tr class="table-light d-flex justify-content-center">
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3 p-3">${maxP.percent}%</th>
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3 p-3">${minP.percent}%</th>
        <td scope="row" class="d-flex justify-content-center align-items-center text-center col-3 p-3">${maxC.capacity}</th>
    </tr>
    `} 

    //table 2

 async function getStats(id){
    let response = await fetch(`https://mh-amazing.herokuapp.com/amazing?time=upcoming`)
    let data = await response.json()
    let events = data.events
    events.map(x=>{
        x.gain = x.estimate * x.price
        
        x.percent = (100 * x.estimate / x.capacity)
       
    })
    let categories = new Set(events.map(x => x.category))
    //el spread lo transforma de array de objeto a un array comun
     categories = [...categories] 
    console.log(categories);
   let stats = categories.map(catego=>{
    let filter = events.filter(x=> x.category === catego )
    return reduceStats(filter)
   })
printTable2(stats,id)
 }
 const printTable2 = (array,id) => {
    array.forEach(element => {
        document.querySelector(`#${id}`).innerHTML +=
        `
        <tr class="table-light d-flex justify-content-center">
            <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center p-3">${element.category}</td>
            <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center p-3">$${element.gain}</td>
            <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center p-3">${element.potencial}%</td>     
        </tr>
        `
    })
}

// se usa reduce para poder realizar operaciones
//aplicandola la funcion a cada elemento del arreglo,
// el resultado se carga en inicialStat y lo manda a filter
// esto con el fin de obtener capacidad total, estimado total y ganancia total

function reduceStats(array){
    let inicialStat = {
        category:"",
        gain:0,
        capacity:0,
        estimate:0
    }
    let stats = array.reduce((element1,element2)=>{
        return{
            category: element2.category,
            gain: element1.gain + element2.gain ,
            capacity: element1.capacity + element2.capacity,
            estimate: element1.estimate + element2.estimate

        }
    },inicialStat)
    stats.potencial = (100 * stats.estimate / stats.capacity).toFixed(2)
    return stats
}
 getStats("table2")

     //table 3

 async function getStats3(id){
    let response = await fetch(`https://mh-amazing.herokuapp.com/amazing?time=past`)
    let data = await response.json()
    let events = data.events
    events.map(x=>{
        x.gain = x.assistance * x.price
        console.log(x.gain);
        x.percent = (100* x.assistance / x.capacity).toFixed(2)
    })
    let categories = new Set(events.map(x=>x.category))
    categories = [...categories]
    let stats = categories.map (catego =>{
        let filter = events.filter(event => event.category===catego)
        return reduceStats1(filter)
    })
    printTable3(stats,id)
 }
 const printTable3 = (array,id) => {
    array.forEach(element => {
        document.querySelector(`#${id}`).innerHTML +=
        `
        <tr class="table-light d-flex justify-content-center">
            <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center p-3">${element.category}</td>
            <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center p-3">$${element.gain}</td>
            <td scope="row" class="col-3 d-flex justify-content-center align-items-center text-center p-3">${element.assistance}%</td>     
        </tr>
        `
    })
}
const reduceStats1 = (array)=>{
    let inicialStat={
        category: "",
        gain: 0,
        capacity: 0,
        assistance: 0
    }
    let stats = array.reduce((element1,element2)=>{
        return{
            category: element2.category,
            gain: element1.gain + element2.gain,
            capacity:element1.capacity + element2.capacity,
            assistance:element1.assistance + element2.assistance
        }
    }, inicialStat)
    stats.assistance = (100 * stats.assistance / stats.capacity).toFixed(2)
    return stats
}

getStats3("table3")