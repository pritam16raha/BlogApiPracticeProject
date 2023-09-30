const mongoose = require('mongoose');

const catagorySchema = new mongoose.Schema({
    
   name: {
    type: String,
    require: true
   }

}, {
    timestamps: true
});

module.exports = mongoose.model("catagories", catagorySchema);