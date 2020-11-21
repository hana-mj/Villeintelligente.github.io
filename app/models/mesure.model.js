const mongoose = require('mongoose');

const MesureSchema = mongoose.Schema({
    sensor: String,
    valeur: String,
    idplante : String
}, {
    timestamps: true
});

module.exports = mongoose.model('Mesure', MesureSchema);