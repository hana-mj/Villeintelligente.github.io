const Abonement = require('../models/abonement.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.titre) {
        return res.status(400).send({
            message: "abonement content can not be empty"
        });
    }

    // Create a admin
    const abonement = new Abonement({
        titre: req.body.titre || "Untitled Admin", 
        pack : req.body.pack,
        payment_par_mois: req.body.payment_par_mois,
        idclient : req.body.idclient
    });

    // Save admin in the database
    abonement.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the abonement."
        });
    });
};

// Retrieve and return all abonement from the database.
exports.findAll = (req, res) => {
    Abonement.find()
    .then(abonements => {
        res.send(abonements);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving abonements."
        });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Abonement.findById(req.params.abonementId)
    .then(abonement => {
        if(!abonement) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.abonementId
            });            
        }
        res.send(abonement);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.abonementId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving admin with id " + req.params.abonementId
        });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.titre) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Find admin and update it with the request body
    Abonement.findByIdAndUpdate(req.params.abonementId, {
        titre: req.body.titre || "Untitled Admin", 
        pack : req.body.pack,
        payment_par_mois: req.body.payment_par_mois,
        idclient : req.body.idclient
    }, {new: true})
    .then(abonement => {
        if(!abonement) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.abonementId
            });
        }
        res.send(abonement);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.abonementId
            });                
        }
        return res.status(500).send({
            message: "Error updating admin with id " + req.params.abonementId
        });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    abonement.findByIdAndRemove(req.params.adminId)
    .then(abonement => {
        if(!abonement) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.abonementId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.abonementId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.abonementId
        });
    });
};
