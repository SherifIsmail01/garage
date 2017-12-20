$(document).ready(function() {
  console.log('app.js loaded!');


  $.ajax({
    method: 'GET',
    url: '/api/vehicles',
    success: onSuccess,
    error: function getError (data) {
      console.log("error getting vehicles" + data);
    }
  })

  function onSuccess (vehicles) {
    console.log(vehicles);
    vehicles.forEach(function(vehicle) {
      renderVehicle(vehicle);
    });
  }



  function renderVehicle (vehicle) {

    // let carCategories = [];

    // [{name: 'Luxury'}, {name: 'Sports'}] ===> ['Luxury', 'Sports'] ===> 'Luxury, Sports'
    // use .map and .join

    
    
    var newValues = vehicle.categories.map(function (obj) {
	    return obj.name;
	});
    newValues = newValues.join(', ');
	    
    let carHTML = 
    `<div class="card" style="width: 20rem;">
      <img class="card-img-top" src=${vehicle.image}> 
        <h3 class="card-title">${vehicle.make}</h3>
        <h4 class="card-text">${vehicle.model}</h4>
        <h5 class="card-text">${vehicle.year}, ${vehicle.color}</h5>
        <p class="card-text">${newValues}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>`

  $('.all-vehicles').prepend(carHTML);

  }
  




});