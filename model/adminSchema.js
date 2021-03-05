const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var adminData = new mongoose.Schema({
    fullName: {
        type: String,
        required: "full name can\'t be empty"
    },
    email: {
        type: String,
        required: "email can\'t be empty",
        unique: true
    },
    password: {
        type: String,
        required: "password can\'t be empty",
        minlength: [4, 'password must be atleast 4 character long']
    },
    address: {
        type: String,
        required: "address can\'t be empty"

    },
    phone: {
        type: String,
        required: "phon can\'t be empty"
    },
    adhar: {
        type: String,
        required: "Adhar can\'t be empty"
    },

}, {
    timestamps: true,
});

adminData.path('email').validate((val) => {
    let email_Regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email_Regex.test(val);
});

adminData.pre('save', async function(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);


        this.password = hash;


        next();
    } catch (error) {
        next(error);
    }
});

adminData.pre('save', async function(next) {
    try {
        const salt1 = await bcrypt.genSalt(10);
        const adharHash = await bcrypt.hash(this.adhar, salt1);


        this.adhar = adharHash;


        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('adminDB', adminData);