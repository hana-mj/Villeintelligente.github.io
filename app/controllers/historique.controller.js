const Historique = require('../models/historique.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.valeur) {
        return res.status(400).send({
            message: "Historique content can not be empty"
        });
    }

    // Create a Note
    const historique = new Historique({
        sensor: req.body.sensor || "Untitled Historique", 
        valeur: req.body.valeur


    });

    // Save Note in the database
    historique.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Historique."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Historique.find()
    .then(historiques => {
        res.send(historiques);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving historiques."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Historique.findById(req.params.historiqueId)
    .then(historique => {
        if(!historique) {
            return res.status(404).send({
                message: "Historique not found with id " + req.params.historiqueId
            });            
        }
        res.send(historique);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Historique not found with id " + req.params.historiqueId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving historique with id " + req.params.historiqueId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Historique content can not be empty"
        });
    }

    // Find note and update it with the request body
    Historique.findByIdAndUpdate(req.params.historiqueId, {
        sensor: req.body.sensor || "Untitled Historique",
        valeur: req.body.valeur
     
    }, {new: true})
    .then(historique => {
        if(!historique) {
            return res.status(404).send({
                message: "Historique not found with id " + req.params.historiqueId
            });
        }
        res.send(historique);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Historique not found with id " + req.params.historiqueId
            });                
        }
        return res.status(500).send({
            message: "Error updating historique with id " + req.params.historiqueId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Historique.findByIdAndRemove(req.params.historiqueId)
    .then(historique => {
        if(!historique) {
            return res.status(404).send({
                message: "Historique not found with id " + req.params.historiqueId
            });
        }
        res.send({message: "Historique deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Historique not found with id " + req.params.historiqueId
            });                
        }
        return res.status(500).send({
            message: "Could not delete historique with id " + req.params.historiqueId
        });
    });
};
