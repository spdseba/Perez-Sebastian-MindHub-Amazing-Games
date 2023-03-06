
const queryString = location.search;

console.log(queryString);
const params = new URLSearchParams(queryString);
const id = params.get("id");

const evt = data.events.find( evt => evt._id  == id)

const div = document.querySelector(".individual-card");
div.innerHTML = `
<div class="card-image-left">
<img class="card-img-top" src="${evt.image}" alt="${evt.name}">
</div>
<div class="card-body-right">
<h5 class="card-title text-center pb-3">${evt.name}</h5>
<h6 class="card-subtitle text-center">${evt.description}</h6>
<h6 class="card-subtitle text-center">${evt.date}</h6>
<h6 class="card-subtitle text-center">${evt.category}</h6>
<h6 class="card-subtitle text-center">${evt.place}</h6>
<h6 class="card-subtitle text-center">${evt.capacity}</h6>
<h6 class="card-subtitle text-center">${evt.estimate}</h6>
<h6 class="card-subtitle text-center">${evt.price}</h6>
</div>
`;

