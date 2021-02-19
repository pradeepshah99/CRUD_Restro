const mongoose = require('mongoose');

const userDATA = require('../model/user_model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

require('dotenv').config();


module.exports.register = (req, res, next) => {
    console.log(req.body);

    let user = new userDATA();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.address = req.body.address;
    user.phone = req.body.phone;

    user.save((err, doc) => {
        if (!err) {
            res.send(doc)
        }
        else if (err.code == 1100) {
            res.status(422).send(['Duplicate email address found']);

        }
        else {
            return next(err);
        }
    })
}

module.exports.login = (req, res, next) => {
    userDATA.find({ email: req.body.email }).then(user => {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: "Authentication Failed"
                });
            }
            else if (result) {
                const token = jwt.sign(
                    { data: user }, 'deep', {
                    expiresIn: "1h"
                }

                )
                return res.status(200).json({
                  message: "authentication done" ,
                  token : token
                })
            }else 
            {
                res.status(401).json({message:"authentication failed"});
            }
        })
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
}