
//Obtengo el dia actual de data.js en formato string
let currentDateString = data.currentDate;
//Creo un objeto Date con la fecha obtenida en data.js
let currentDate = new Date(currentDateString);
//Obtengo el elemento HTML donde voy a renderizar las cards
let cards = document.getElementById('card-group');
//Variable que almacena los eventos pasados
let pastEventsCount = 0;

let fragment = document.createDocumentFragment();
//Recorro el arreglo de eventos y genero dinamicamente los templates que
//se van a agregar al document fragment para luego agregarlos al elemento HTML
for (let events of data.events) {

    let eventeDateString = events.date;
    let eventDate = new Date(eventeDateString);

    if (eventDate < currentDate) {
        pastEventsCount++;
        let card = document.createElement('div');
        card.className = "d-flex justify-content-center col-md-6 col-lg-4 py-5";
        card.innerHTML = `
        <div class="card flex-column justify-content-between col-md-6 col-lg-4">
          <div class="card-image">
            <img class="card-img-top" src="${events.image}" alt="Food Fair Image">
          </div>
          <div class="card-body  overflow-hidden">
            <h5 class="card-title text-center">${events.name}</h5>
            <h6 class="card-subtitle mb-2 text-center p-3">${events.description}</h6>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center py-1">
            <span>Price:$ ${events.price}</span>
            <a href="./details.html" class="btn">See More</a>
          </div>
        </div>`;
        fragment.appendChild(card);
    }
    

}
//Si no se encontraron eventos pasados se imprime un mensaje en pantalla
if(pastEventsCount == 0){
  let card = document.createElement('div');
  card.className = "d-flex justify-content-center w-100";
  card.innerHTML = `<div class="alert alert-primary" role="alert">
  No past events found
</div>`;
  fragment.appendChild(card);
}

cards.appendChild(fragment);