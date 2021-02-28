const mongoose = require('mongoose');

var postData = new mongoose.Schema({

    postTitle: {
        type: String,
        required: "Post Title can\'t be empty"

    },

    postSub: {
        type: String,
        required: "Subject can not be empty"
    },

    postContent: {
        type: String,
        required: "Cant leave empty"
    }

});


module.exports = mongoose.model('post', postData);