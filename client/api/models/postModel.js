const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    
    title: {
        type: String,
        require: true,
        unique: true
    },

    body: {
        type: String,
        require: true,
    },

    photo: {
        type: String,
        require: false
    },

    username: {
        type: String,
        require: true
    },

    catagories: {
        type: Array,
        require: false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("blog", postSchema);