let table = document.getElementById("table");
//URL de la API de donde se van a obtener los eventos
let urlAPI = "https://mindhub-xj03.onrender.com/api/amazing";

let fragment = document.createDocumentFragment();
async function getDataFromApi(urlAPI) {
  try {
      const response = await fetch(urlAPI)
      const data = await response.json();
      console.log(data)
      evtMaxAtt_evtMinAtt_evtMaxCap(data);
      upcomingEvt_by_category(data);
      pastEvt_by_category(data);

  }
  catch(error){
      console.error('Error: '+error);
  }    
}

function renderTableEvtStatistics(evtMaxAtt, evtMinAtt, evtMaxCapacity){

  console.log("TAble")
     let card = document.createElement('div');

     card.className = "";
     card.innerHTML = `
     <h2 class="table-title py-1">Events Statistics</h2>
     <table class="table">
       <thead class="">
           <tr>
               <th scope="col">Event with the highest percentage of attendance</th>
               <th scope="col">Event with the lowest percentage of attendance</th>
               <th scope="col">Event with larger capacity</th>
           </tr>
       </thead>
       <tbody>
         <tr>
           <td>${evtMaxAtt.name} (${evtMaxAtt.maxAtt.toFixed(2)}%)</td>
           <td>${evtMinAtt.name} (${evtMinAtt.minAtt.toFixed(2)}%)</td>
           <td>${evtMaxCapacity.name} (${evtMaxCapacity.maxCapacity})</td>
         </tr>
       </tbody>
     </table>`;
     fragment.appendChild(card);
   //}
   table.appendChild(fragment);
}
function evtMaxAtt_evtMinAtt_evtMaxCap(data){
  let maxAtt = 0;
  let attendance = 0;
  let minAtt = 100;
  let maxCapacity = 0;
  let evtMaxAtt = {};
  let evtMinAtt = {};
  let evtMaxCapacity = {};
      for(let evt of data.events){
        //console.log(evt)
        if(evt.assistance){
          attendance = (parseInt(evt.assistance) * 100) / parseInt(evt.capacity);
          if(attendance >= maxAtt){
            maxAtt = attendance;
            evtMaxAtt = evt;
            evtMaxAtt["maxAtt"] = attendance;
          }
          if(attendance <= minAtt){
            minAtt = attendance
            evtMinAtt = evt;
            evtMinAtt["minAtt"] = attendance
          }
        }
        if(evt.capacity > maxCapacity){
          maxCapacity = evt.capacity;
          evtMaxCapacity = evt;
          evtMaxCapacity["maxCapacity"] = maxCapacity;
        }
      }
      console.log(evtMaxAtt);
      console.log(evtMinAtt);
      console.log(evtMaxCapacity);
      renderTableEvtStatistics(evtMaxAtt, evtMinAtt, evtMaxCapacity);
}

function renderTableUpEvtByCategory(categories){

     let card = document.createElement('div');
     card.className = "";
     let template2 = "";
     let keysCat = Object.keys(categories);
     console.log(keysCat)
     for(let i = 0; i < keysCat.length ; i++){
      console.log(categories[keysCat[i]])
      console.log(categories[keysCat[i]].estimate)
      if(categories[keysCat[i]].revenue > 0){
        template2 +=
        `<tr>
          <td>${keysCat[i]}</td>
          <td>${categories[keysCat[i]].revenue}</td>
          <td>${((categories[keysCat[i]].estimate * 100) / categories[keysCat[i]].capacity).toFixed(2) } %</td>
        </tr>`
      }
    }
     let template = `
     <h2 class="table-title py-1">Upcoming events statistics by category</h2>
     <table class="table">
       <thead class="">
           <tr>
            <th scope="col">Categories</th>
            <th scope="col">Revenues</th>
            <th scope="col">Percentage of attendance</th>
           </tr>
       </thead>
       <tbody>
          ${template2}
       </tbody>
     </table>`
     card.innerHTML = template;
     fragment.appendChild(card);
   table.appendChild(fragment);
}

function generateCategoryObject(data){
  console.log(data);
  let categories = {}
  for(let evt of data.events){
    if(!categories.hasOwnProperty(evt.category)){
      categories[evt.category] = {
        "revenue" : 0,
        "estimate" : 0,
        "capacity" : 0,
        "assistance" : 0
       }
    }
  }
  return categories;
}

function upcomingEvt_by_category(data){
  let categoriesData = generateCategoryObject(data);
    console.log("datos"+data.currentDate);

    currentDate = data.currentDate;
    //let currentDate = new Date(data.currentDate);
    console.log(currentDate);
    for(let evt of data.events){
      if(evt.date > currentDate){
        console.log("Date")
        categoriesData[evt.category].revenue += parseInt(evt.estimate) * parseInt(evt.price)
        categoriesData[evt.category].estimate += parseInt(evt.estimate)
        categoriesData[evt.category].capacity += parseInt(evt.capacity)
    }

  }
  renderTableUpEvtByCategory(categoriesData);

}



function renderTablePastEvtByCategory(categories){
  console.log("TAble")
     // console.log("Entro")
     let card = document.createElement('div');
     card.className = "";
     let template2 = "";
    // console.log(categories)
     let keysCat = Object.keys(categories);
     console.log(keysCat)
     for(let i = 0; i < keysCat.length ; i++){
      console.log(categories[keysCat[i]])
      console.log(categories[keysCat[i]].estimate)
      if(categories[keysCat[i]].revenue > 0){
        console.log(categories[keysCat[i]].eventCount);
        template2 +=
        `<tr>
          <td>${keysCat[i]}</td>
          <td>${categories[keysCat[i]].revenue}</td>
          <td>${(((categories[keysCat[i]].assistance / categories[keysCat[i]].capacity * 100) )).toFixed(2) } %</td>
        </tr>`
      }
    }
     let template = `
     <h2 class="table-title py-1">Past events statistics by category</h2>
     <table class="table">
       <thead class="">
           <tr>
            <th scope="col">Categories</th>
            <th scope="col">Revenues</th>
            <th scope="col">Percentage of attendance</th>
           </tr>
       </thead>
       <tbody>
          ${template2}
       </tbody>
     </table>`
     card.innerHTML = template;
     fragment.appendChild(card);
   //}
   table.appendChild(fragment);
}

function pastEvt_by_category(data){
  let categoriesData = generateCategoryObject(data);
    console.log("datos"+data.currentDate);

    currentDate = data.currentDate;
    //let currentDate = new Date(data.currentDate);
    console.log(currentDate);
    for(let evt of data.events){
      if(evt.date < currentDate){
        console.log("Date")
        categoriesData[evt.category].revenue += parseInt(evt.assistance) * parseInt(evt.price);
        categoriesData[evt.category].assistance += parseInt(evt.assistance);
        categoriesData[evt.category].capacity += parseInt(evt.capacity);
    }

  }
  renderTablePastEvtByCategory(categoriesData);

}

getDataFromApi(urlAPI);

