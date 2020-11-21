const Sensor = require('../models/sensor.model.js');

// Create and Save a new Sensor
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }

    // Create a sensor
    const sensor = new Sensor({
        name: req.body.name || "Untitled Sensor", 
        valeur: req.body.valeur
    });

    // Save sensor in the database
    sensor.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all sensor from the database.
exports.findAll = (req, res) => {
    Sensor.find()
    .then(sensors => {
        res.send(sensors);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single sensor with a noteId
exports.findOne = (req, res) => {
    Sensor.findById(req.params.sensorId)
    .then(sensor => {
        if(!sensor) {
            return res.status(404).send({
                message: "Sensor not found with id " + req.params.sensorId
            });            
        }
        res.send(sensor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Sensor not found with id " + req.params.sensorId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving sensor with id " + req.params.sensorId
        });
    });
};

// Update a sensor identified by the sensorId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Sensor password can not be empty"
        });
    }

    // Find sensor and update it with the request body
    Sensor.findByIdAndUpdate(req.params.sensorId, {
        SCT013: req.body.SCT013 || "Untitled Sensor",
        valeur: req.body.valeur
    }, {new: true})
    .then(sensor => {
        if(!sensor) {
            return res.status(404).send({
                message: "Sensor not found with id " + req.params.sensorId
            });
        }
        res.send(sensor);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Sensor not found with id " + req.params.sensorId
            });                
        }
        return res.status(500).send({
            message: "Error updating sensor with id " + req.params.sensorId
        });
    });
};

// Delete a sensor with the specified sensorId in the request
exports.delete = (req, res) => {
    Sensor.findByIdAndRemove(req.params.sensorId)
    .then(sensor => {
        if(!sensor) {
            return res.status(404).send({
                message: "Sensor not found with id " + req.params.sensorId
            });
        }
        res.send({message: "Sensor deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Sensor not found with id " + req.params.sensorId
            });                
        }
        return res.status(500).send({
            message: "Could not delete sensor with id " + req.params.sensorId
        });
    });
};
