const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    username: String,
    password : String,
    email : String,
    pack: String,
    payment_par_mois: String
    
}, {
    timestamps: true
});

module.exports = mongoose.model('Client', ClientSchema);