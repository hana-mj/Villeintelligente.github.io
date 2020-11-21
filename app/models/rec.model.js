const mongoose = require('mongoose');

const RecSchema = mongoose.Schema({
        username: {
            type: String,
        
            required: [true, 'The username is required'],
            unique: [true, 'The username is unique']
           
    },
    texte: {
            type: String,
        
            required: [true, 'The email is required'],
            unique: [true, 'The email is unique']
           
    },
    image : String
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Rec', RecSchema);