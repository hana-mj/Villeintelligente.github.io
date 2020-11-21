const mongoose = require('mongoose');

const PositionSchema = mongoose.Schema({
        idtaxi: {
                type: String,
            
                required: [true, 'idtaxi is required'],
                
               
        },

        x: {
            type: String,
        
            required: [true, 'x is required'],
            
           
    },
        y: {
            type: String,
        
            required: [true, 'y is required'],
            
           
    },
   
}, {
    timestamps: true
});

module.exports = mongoose.model('Position', PositionSchema);