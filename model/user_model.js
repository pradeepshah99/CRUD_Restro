const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var userData = new mongoose.Schema({
    fullName:{
        type:String,
        required:"full name can\'t be empty"
    },
    email:{
        type:String,
        required:"email can\'t be empty",
        unique: true
    },
    password:{
        type:String,
        required:"password can\'t be empty",
        minlength:[4,'password must be atleast 4 character long']
    },
    address:{
        type:String,
        required:"address can\'t be empty"

    },
    phone:{
        type:String,
        required:"phon can\'t be empty"
    }
}
    
);

// customer validation for the email

userData.path('email').validate((val)=>{
    let email_Regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email_Regex.test(val);
});

// hasing the password..

userData.pre('save', function()
{

})