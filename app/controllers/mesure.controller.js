const Mesure = require('../models/mesure.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.valeur) {
        return res.status(400).send({
            message: "Mesure content can not be empty"
        });
    }

    // Create a Note
    const mesure = new Mesure({
        sensor: req.body.sensor || "Untitled Sensor", 
        valeur: req.body.valeur,
        idplante : req.body.idplante
    });

    // Save Note in the database
    mesure.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Mesure."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Mesure.find()
    .then(mesures => {
        res.send(mesures);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving mesures."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Mesure.findById(req.params.mesureId)
    .then(mesure => {
        if(!mesure) {
            return res.status(404).send({
                message: "Mesure not found with id " + req.params.mesureId
            });            
        }
        res.send(mesure);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Mesure not found with id " + req.params.mesureId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving mesure with id " + req.params.mesureId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Mesure content can not be empty"
        });
    }

    // Find note and update it with the request body
    Mesure.findByIdAndUpdate(req.params.mesureId, {
        title: req.body.title || "Untitled Mesure",
        content: req.body.content
    }, {new: true})
    .then(mesure => {
        if(!mesure) {
            return res.status(404).send({
                message: "Mesure not found with id " + req.params.mesureId
            });
        }
        res.send(mesure);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Mesure not found with id " + req.params.mesureId
            });                
        }
        return res.status(500).send({
            message: "Error updating mesure with id " + req.params.mesureId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Mesure.findByIdAndRemove(req.params.mesureId)
    .then(mesure => {
        if(!mesure) {
            return res.status(404).send({
                message: "Mesure not found with id " + req.params.mesureId
            });
        }
        res.send({message: "Mesure deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Mesure not found with id " + req.params.mesureId
            });                
        }
        return res.status(500).send({
            message: "Could not delete mesure with id " + req.params.mesureId
        });
    });
};
