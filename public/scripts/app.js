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
    var newValues = vehicle.categories.map(function (obj) {
	    return obj.name;
		});
    newValues = newValues.join(', '); // 'Luxury, Sport'
	    
    let carHTML = 

    `<div class="card whole-vehicle-card" id="${vehicle._id}" style="width: 20rem;">
      <img class="card-img-top vehicle-image" src=${vehicle.image}> 
        <h3 class="card-title">${vehicle.make}</h3>
        <h4 class="card-text">${vehicle.model}</h4>
        <h5 id="vehicle.year" class="card-text">${vehicle.year}, ${vehicle.color}</h5> 
        <p class="card-text">${newValues}</p>
        <button type="button" class="edit-vehicle btn btn-primary" data-toggle="modal" data-target="#modal-${vehicle._id}" data-id=${vehicle._id}>Edit</button>
			<!-- Modal -->
			<div class="modal fade" id="modal-${vehicle._id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			  <div class="modal-dialog" role="document">
			    <div class="modal-content">
			      <div class="modal-header">
			        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
			        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
			          <span aria-hidden="true">&times;</span>
			        </button>
			      </div>
			      <div class="modal-body">
			        	<form class="col-md-6" data-id="${vehicle._id}">
				                <ul>
				                  <div class="row pull-left">
				                    <div class="col-md-12 text-center">
				                      <label for="make">Make</label>
				                      <input name="make" type="text" id="make" value="${vehicle.make}">
				                    
				                      <label for="model">Model</label>
				                      <input name="model" type="text" id="model" value="${vehicle.model}">
				                    </div>
				                  </div>

				                  <div class="row pull-left">
				                    <div class="col-md-12 text-center">
				                      <label for="year">Year</label>
				                      <input name="year" type="text" id="year" value="${vehicle.year}">

				                      <label for="color">Color</label>
				                      <input name="color" type="text" id="color" value="${vehicle.color}">
				                    </div>
				                  </div>
				                  <div class="row pull-left">
				                    <div class="col-md-12 text-center">
				                      <label for="image">Image</label>
				                      <input name="image" type="text" id="image" value="${vehicle.image}">
				                    </div>
				                  </div>
				                </ul>
				              </div>
				          <!-- Category selections -->
				              <div class="col-md-6">
				                <h4>Add vehicle categories</h4>

				                <div class="form-check form-check-inline">
				                  <label class="form-check-label">
				                  <input ${ newValues.includes('Luxury') ? 'checked' : '' } name="Luxury" class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1">Luxury
				                  </label>
				                </div>

				                <div class="form-check form-check-inline">
				                  <label class="form-check-label">
				                  <input ${ newValues.includes('Sport') ? 'checked' : '' } name="Sport" class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2">Sport
				                  </label>
				                </div>

				                <div class="form-check form-check-inline">
				                  <label class="form-check-label">
				                  <input ${ newValues.includes('Muscle') ? 'checked' : '' } name="Muscle" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">Muscle
				                  </label>
				                </div>

				                <div class="form-check form-check-inline">
				                  <label class="form-check-label">
				                  <input ${ newValues.includes('Exotic') ? 'checked' : '' } name="Exotic" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">Exotic
				                  </label>
				                </div>

				                <div class="form-check form-check-inline">
				                  <label class="form-check-label">
				                  <input ${ newValues.includes('SUV') ? 'checked' : '' } name="SUV" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">SUV
				                  </label>
				                </div>

				                <div class="form-check form-check-inline">
				                  <label class="form-check-label">
				                  <input ${ newValues.includes('Pick-up') ? 'checked' : '' } name="Pick-up" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">Pick-up
				                  </label>
				                </div>

				                <div class="form-check form-check-inline">
				                  <label class="form-check-label">
				                  <input ${ newValues.includes('Sedan') ? 'checked' : '' } name="Sedan" class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3">Sedan
				                  </label>
				                </div>
				              </form>

			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
			        <button type="button" class="btn btn-primary" id="save-btn-modal" data-id=${vehicle._id}>Save changes</button>
			      </div>
			    </div>
			  </div>
			</div>
			<!-- End of Modal -->
        <button class="delete-vehicle btn btn-danger" data-id=${vehicle._id}>Delete</button>
      </div>
    </div>`

  $('.all-vehicles').prepend(carHTML);
  }
  


  $('#add-new-vehicle-form').on('submit', function(e) {
  	e.preventDefault();
  	console.log ('new vehicle ', $(this).serialize());

  	$.ajax({
  		method: 'POST',
  		url: '/api/vehicles',
  		data: $('#add-new-vehicle-form').serialize(),
  		success: postNewVehicle,
  		error: addNewVehicleError
  	})
  })

  function postNewVehicle(newVehicle) {
  	console.log(newVehicle);
  	renderVehicle(newVehicle);
  }

  function addNewVehicleError(err) {
  	console.log ('Error adding vehicle: ' + err);
  }







  $('.all-vehicles').on('click', '.delete-btn', function(e) {
  	console.log('delete button clicked');
	$.ajax({
		method: 'DELETE',
		url: '/api/vehicles/' + $('.delete-btn').attr('data-id'),
		success: deleteVehicleSuccess,
		error: deleteVehicleError
	});
});

  function deleteVehicleSuccess (deletedVehicle) {
  	console.log (deletedVehicle);
  	var deletedVehicleId = deletedVehicle._id;
  	$(`#${deletedVehicleId}`).remove();
  }

  function deleteVehicleError (err) {
  	console.log("Error deleting vehicle: " + err);
  }

  $('.all-vehicles').on('click', '.edit-vehicle', function handleVehicleEditClick(e) {
		console.log ('edit button clicked');
	});

  $('.all-vehicles').on('click', '#save-btn-modal', function handleVehicleSaveClick(e) {
  	console.log('save button clicked');
  	console.log($(`form[data-id="${$(this).attr('data-id')}"]`).serialize());
   
  	$.ajax({
  		method: 'PUT',
  		url: '/api/vehicles/' + $(this).attr('data-id'), // the data-id on the button you just clicked
  		data: $(`form[data-id="${$(this).attr('data-id')}"]`).serialize(), // {make: 'bmw!!!!', model: 2001}
  		success: editVehicleSuccess,
  		error: editVehicleError
  	});
	});
	

  function editVehicleSuccess (editedVehicle) {
  	renderVehicle(editedVehicle);
  }


  function editVehicleError (err) {
  	console.log ('Error edit vehicle: ' + err);
  }


});