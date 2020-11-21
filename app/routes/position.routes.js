module.exports = (app) => {
    const positions = require('../controllers/position.controller.js');


    app.post('/positions', positions.create);

    
    app.get('/positions', positions.findAll);

   
    app.get('/positions/:positionId', positions.findOne);

    
    app.put('/positions/:positionId', positions.update);

    
    app.delete('/positions/:positionId', positions.delete);
}
