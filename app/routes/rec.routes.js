module.exports = (app) => {
    const recs = require('../controllers/rec.controller.js');


    app.post('/recs', recs.create);

    
    app.get('/recs', recs.findAll);

   
    app.get('/recs/:recId', recs.findOne);

    
    app.put('/recs/:recId', recs.update);

    
    app.delete('/recs/:recId', recs.delete);
}
