module.exports = (app) => {
    const sensors = require('../controllers/sensor.controller.js');

    // Create a new Sensor
    app.post('/sensors', sensors.create);

    // Retrieve all Sensors
    app.get('/sensors', sensors.findAll);

    // Retrieve a single Sensor with noteId
    app.get('/sensors/:sensorId', sensors.findOne);

    // Update a Sensor with noteId
    app.put('/sensors/:sensorId', sensors.update);

    // Delete a sensor with noteId
    app.delete('/sensors/:sensorId', sensors.delete);
}