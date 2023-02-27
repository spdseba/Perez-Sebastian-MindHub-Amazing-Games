
let cards = document.getElementById('card-group');
let fragment = document.createDocumentFragment();

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
        <a href="./details.html" class="btn">See More</a>
      </div>
    </div>`;
    fragment.appendChild(card);
}

cards.appendChild(fragment);