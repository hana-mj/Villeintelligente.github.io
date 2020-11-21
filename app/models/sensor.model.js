const mongoose = require('mongoose');

const SensorSchema = mongoose.Schema({
    name: String,
    valeur: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Sensor', SensorSchema);