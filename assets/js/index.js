
let cards = document.getElementById('card-group');
let fragment = document.createDocumentFragment();

let categories = [];
let categoryContainer = document.querySelector(".category-check");

let arrayCategories = data.events.map( eventData => {
  if(!categories.includes(eventData.category)){
    categories.push(eventData.category)
  }
})
console.log(categoryContainer);
console.log(categories);

function renderCards(){
  for (let events of data.events){
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

renderCards();

cards.appendChild(fragment);
let categoryFragment = document.createDocumentFragment();
for(let category of categories){
  let div = document.createElement("div");
  div.innerHTML = `
      <div class="individual-check">
        <label for="category1" class="mx-2">${category}</label>
        <input type="checkbox" name="category" class="category-checkbox" value="${category}" id="${category}">
      </div>
  `;
  categoryFragment.appendChild(div);
}
categoryContainer.appendChild(categoryFragment);

//Agrego Listeners a los input checkbox
let categoryCheckboxes = document.querySelectorAll("input[type=checkbox]");
console.log(categoryCheckboxes);
categoryCheckboxes.forEach((checkbox) => checkbox.addEventListener('change', selection));

function selection(){
  //Convierto la NodeList en un array
  let checkedInput = Array.from(categoryCheckboxes).filter(checkbox => checkbox.checked);

  console.log(checkedInput);
  return checkedInput;
}


const searchBtn = document.getElementById("search-button");
searchBtn.addEventListener("click", findCards);
console.log(searchBtn);
const searchInput = document.getElementById("search-input");

console.log(searchInput);

function findCards(){
  let selectedCategories = selection();
  console.log("Selected categories ",selectedCategories);
  let searchText = searchInput.value;
  let cards = [];
  data.events.forEach(evt => {
    if(selectedCategories.includes(evt.category)){
      cards.push(evt);
    }
  })
  console.log(cards);
  return cards;
}