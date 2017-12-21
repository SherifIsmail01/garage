let express = require('express');
	  db = require('./models');
	  bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public', {root: __dirname}));


app.get('/', function homepage(req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


app.get('/api/vehicles', function index(req, res) {
  db.Vehicle.find({}, function(err, data) {
    if (err) {
      console.log(err)
    }
    res.json(data);
  })
});

app.get('/api/vehicles/:id', function show(req, res) {
  db.Vehicle.find({_id: req.params.id}, function(err, data) {
    res.json(data);
  });
});


app.post('/api/vehicles', function create(req, res) {
  var newVehicle = new db.Vehicle({
    image: req.body.image,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    categories: req.body.newValues
  });
  newVehicle.save(function (err, newVehicleInDb) {
    console.log(newVehicleInDb);
    res.json(newVehicleInDb);
  });
});


app.delete('/api/vehicles/:id', function destroy(req, res) {
    var vehicleId = req.params.id;
    db.Vehicle.findByIdAndRemove(vehicleId, function (err, deletedVehicle) {
      res.json(deletedVehicle);
    });
});


app.put('/api/vehicles/:id', function update(req, res) {
  var vehicleId = req.params.id;
  db.vehicle.findById(vehicleId, function (err, foundVehicle) {
    foundVehicle.make = req.body.make;
    foundVehicle.model = req.body.model;
    foundVehicle.year = req.body.year;
    foundVehicle.color = req.body.color;
    foundVehicle.newValues = req.body.newValues;
    foundVehicle.save(function (err, savedVehicle) {

    res.json(savedVehicle);

    });
  });
});







app.listen(process.env.PORT || 3000, function () {
	console.log ('Express server is up and running on http://localhost:3000/');
});