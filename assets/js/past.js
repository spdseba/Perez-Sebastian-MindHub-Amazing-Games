
//Obtengo el dia actual de data.js en formato string
let currentDateString = data.currentDate;
//Creo un objeto Date con la fecha obtenida en data.js
let currentDate = new Date(currentDateString);
//Obtengo el elemento HTML donde voy a renderizar las cards
let cards = document.getElementById('card-group');
//Variable que almacena los eventos por venir
let pastEventsCount = 0;

let fragment = document.createDocumentFragment();
//Recorro el arreglo de eventos y genero dinamicamente los templates que
//se van a agregar al document fragment para luego agregarlos al elemento HTML

//Creo un arreglo vacio para guardar las categorias sin repetir
let categories = [];
//Guardo en una variable el elemento HTML que contiene los checkbox
let categoryContainer = document.querySelector(".category-check");

//recorro el arreglo de eventos y guardo las categorias que no esten repetidas
let arrayCategories = data.events.map( eventData => {
  if(!categories.includes(eventData.category)){
    categories.push(eventData.category)
  }
})

//Funcion que recorre el json con los eventos y crea dinamicamente las cards
function renderCards(){
  for (let events of data.events){
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
        <a href="./details.html?id=${events._id}" class="btn">See More</a>
      </div>
    </div>`;
    fragment.appendChild(card);
    }
  }

  //Si no se encontraron eventos pasados se imprime un mensaje en pantalla
  if(pastEventsCount == 0){
    let card = document.createElement('div');
    card.className = "d-flex justify-content-center align-items-center  h-100 w-100";
    card.innerHTML = `<div class="alert alert-primary" role="alert">
    No Past events found
    </div>`;
    fragment.appendChild(card);
    cards.appendChild(fragment);
  }

}
renderCards();

cards.appendChild(fragment);
let categoryFragment = document.createDocumentFragment();
for(let category of categories){
  let div = document.createElement("div");
  div.innerHTML = `
      <div class="individual-check">
        <label for="category1" class="">${category}</label>
        <input type="checkbox" name="category" class="category-checkbox" value="${category}" id="${category}">
      </div>
  `;
  categoryFragment.appendChild(div);
}
categoryContainer.appendChild(categoryFragment);

//Agrego Listeners a los input checkbox
let categoryCheckboxes = document.querySelectorAll("input[type=checkbox]");

categoryCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', selection));

function selection(){
  //Convierto la NodeList en un array
  let checkedInput = Array.from(categoryCheckboxes).filter(checkbox => checkbox.checked);
  return checkedInput;
}



///////////////////////////////////////////////////////////

//Obtengo el elemento html search button y le agrego un listener
const searchBtn = document.getElementById("search-button");
searchBtn.addEventListener("click", findCards);

const searchInput = document.getElementById("search-input");

//Funcion que busca los eventos que cumplan con la condicion de las categorias buscadas y el parametro de busqueda
//en el search, y luego recorre los valores encontrados y los imprime en el Html
function findCards(e){
  let  pastEventsCount = 0;
  e.preventDefault();
  let selectedInputCategories = selection();
  let catNames = selectedInputCategories.map(cat => cat.value);
  let searchText = searchInput.value.trim().toLowerCase();
  let cards = [];
  if(searchText == "" && catNames.length == 0){
    data.events.forEach(evt => {
        cards.push(evt);
    });
  }else{
    data.events.forEach(evt => {
      //console.log(evt);
      //console.log("Selected",catNames.includes(evt.category));
      if(catNames.includes(evt.category) && evt.name.toLowerCase().startsWith(searchText)){
        cards.push(evt);
      }
    });
  }

  let evtsCards = document.getElementById('card-group');
  evtsCards.innerHTML = "";
let fragment = document.createDocumentFragment();
  for (let events of cards){
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
        <a href="./details.html?id=${events._id}" class="btn">See More</a>
      </div>
    </div>`;
    fragment.appendChild(card);
  }
  evtsCards.appendChild(fragment);

}
 console.log(pastEventsCount)
    //Si no se encontraron eventos pasados se imprime un mensaje en pantalla
    if(pastEventsCount == 0){
      let card = document.createElement('div');
      card.className = "d-flex justify-content-center align-items-center  h-100 w-100";
      card.innerHTML = `<div class="alert alert-primary" role="alert">
      No past events found
    </div>`;
      fragment.appendChild(card);
      evtsCards.appendChild(fragment);
    }
}