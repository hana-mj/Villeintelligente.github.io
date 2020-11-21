module.exports = (app) => {
    const abonements = require('../controllers/abonement.controller.js');


    app.post('/abonements', abonements.create);

    
    app.get('/abonements', abonements.findAll);

   
    app.get('/abonements/:abonementId', abonements.findOne);

    
    app.put('/abonements/:abonementId', abonements.update);

    
    app.delete('/abonements/:abonementId', abonements.delete);
}
