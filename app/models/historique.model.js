const mongoose = require('mongoose');

const HistoriqueSchema = mongoose.Schema({
    sensor: String,
    valeur: String,
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Historique', HistoriqueSchema);