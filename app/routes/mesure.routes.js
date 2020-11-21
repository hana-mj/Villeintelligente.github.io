module.exports = (app) => {
    const mesures = require('../controllers/mesure.controller.js');

    // Create a new Note
    app.post('/mesures', mesures.create);

    // Retrieve all Notes
    app.get('/mesures', mesures.findAll);

    // Retrieve a single Note with noteId
    app.get('/mesures/:mesureId', mesures.findOne);

    // Update a Note with noteId
    app.put('/mesures/:mesureId', mesures.update);

    // Delete a Note with noteId
    app.delete('/mesures/:mesureId', mesures.delete);
}