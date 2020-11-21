module.exports = (app) => {
    const historiques = require('../controllers/historique.controller.js');

    // Create a new Note
    app.post('/historiques', historiques.create);

    // Retrieve all Notes
    app.get('/historiques', historiques.findAll);

    // Retrieve a single Note with noteId
    app.get('/historiques/:historiqueId', historiques.findOne);

    // Update a Note with noteId
    app.put('/historiques/:historiqueId', historiques.update);

    // Delete a Note with noteId
    app.delete('/historiques/:historiqueId', historiques.delete);
}