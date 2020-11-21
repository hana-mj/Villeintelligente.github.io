const Position = require('../models/position.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.x) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Create a admin
    const position = new Position({
        idtaxi:req.body.idtaxi,
        x: req.body.x || "Untitled Admin", 
        y: req.body.y
    });

    // Save admin in the database
    position.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the admin."
        });
    });
};

// Retrieve and return all admin from the database.
exports.findAll = (req, res) => {
    Position.find()
    .then(positions => {
        res.send(positions);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving admins."
        });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Position.findById(req.params.positionId)
    .then(position => {
        if(!position) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.positionId
            });            
        }
        res.send(position);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.positionId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.positionId
        });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.x) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Find admin and update it with the request body
   Position.findByIdAndUpdate(req.params.positionId, {
        idtaxi: req.body.idtaxi,
        x: req.body.x || "Untitled admin", 
        y: req.body.y
    }, {new: true})
    .then(position => {
        if(!position) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.positionId
            });
        }
        res.send(position);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.positionId
            });                
        }
        return res.status(500).send({
            message: "Error updating admin with id " + req.params.positionId
        });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    Position.findByIdAndRemove(req.params.positionId)
    .then(position => {
        if(!position) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.positionId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.positionId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.positionId
        });
    });
};
