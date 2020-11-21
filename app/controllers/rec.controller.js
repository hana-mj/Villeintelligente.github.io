const Rec = require('../models/rec.model.js');

// Create and Save a new admin
exports.create = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "admin content can not be empty"
        });
    }

    // Create a admin
    const rec = new Rec({
        username: req.body.username || "Untitled Admin", 
        texte: req.body.texte,
        image : req.body.image
        
    });

    // Save admin in the database
    rec.save()
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
    Rec.find()
    .then(recs => {
        res.send(recs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving admins."
        });
    });
};

// Find a single admin with a adminId
exports.findOne = (req, res) => {
    Rec.findById(req.params.recId)
    .then(rec => {
        if(!rec) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.recId
            });            
        }
        res.send(rec);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "rec not found with id " + req.params.recId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving rec with id " + req.params.recId
        });
    });
};

// Update a admin identified by the adminId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "rec content can not be empty"
        });
    }

    // Find admin and update it with the request body
    Rec.findByIdAndUpdate(req.params.adminId, {
        username: req.body.username || "Untitled admin", 
        texte : req.body.texte,
        image : req.body.image
    
    }, {new: true})
    .then(rec => {
        if(!rec) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.recId
            });
        }
        res.send(rec);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "rec not found with id " + req.params.recId
            });                
        }
        return res.status(500).send({
            message: "Error updating rec with id " + req.params.recId
        });
    });
};

// Delete a admin with the specified adminId in the request
exports.delete = (req, res) => {
    Rec.findByIdAndRemove(req.params.recId)
    .then(rec => {
        if(!rec) {
            return res.status(404).send({
                message: "admin not found with id " + req.params.recId
            });
        }
        res.send({message: "admin deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "admin not found with id " + req.params.recId
            });                
        }
        return res.status(500).send({
            message: "Could not delete admin with id " + req.params.recId
        });
    });
};
