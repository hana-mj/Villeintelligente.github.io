const mongoose = require('mongoose');

const AbonementSchema = mongoose.Schema({
    titre: String,
    pack : String,
    payment_par_mois: String,
    idclient : String
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Abonement', AbonementSchema);