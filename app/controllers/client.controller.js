const Client = require('../models/client.model.js');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.username) {
        return res.status(400).send({
            message: "Client content can not be empty"
        });
    }

    // Create a Note
    const client = new Client({
        username: req.body.username || "Untitled Client", 
        password : req.body.password,
        email : req.body.email,
        address: req.body.address,
        pack :req.body.pack,
        payment_par_mois :req.body.payment_par_mois

        
    });

    // Save Note in the database
    client.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Client."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Client.find()
    .then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clients."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Client.findById(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });            
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving client with id " + req.params.clientId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.username) {
        return res.status(400).send({
            message: "Client content can not be empty"
        });
    }

    // Find note and update it with the request body
    Client.findByIdAndUpdate(req.params.clientId, {
        username: req.body.username || "Untitled Client", 
        password : req.body.password,
        email : req.body.email,
        address: req.body.address,
        pack :req.body.pack,
        payment_par_mois :req.body.payment_par_mois

    }, {new: true})
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error updating client with id " + req.params.clientId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.send({message: "Client deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Could not delete client with id " + req.params.clientId
        });
    });
};
