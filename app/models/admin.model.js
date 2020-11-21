const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
        username: {
            type: String,
        
            required: [true, 'The username is required'],
            unique: [true, 'The username is unique']
           
    },
    email: {
            type: String,
        
            required: [true, 'The email is required'],
            unique: [true, 'The email is unique']
           
    },
    password: {
            type: String,
        
            required: [true, 'The username is required'],
         
           
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);