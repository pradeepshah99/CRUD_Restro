const mongoose = require('mongoose');

const userDATA = require('../model/user_model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

require('dotenv').config();


module.exports.register = async (req, res, next) => {
    

    let user = new userDATA();
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.password = req.body.password;
    user.address = req.body.address;
    user.phone = req.body.phone;

    if(!req.body.fullName || !req.body.email || !req.body.password ||  !req.body.address || !req.body.phone)
    {
        res.status(401).json({message: "All Field are Mandatory"});
    }
    else { 

        await user.save().then((err, result) => {
        if(err) {
            res.json(err);
        } else {
            res.status(200).json({message: "Data saved successfully", Result : result});
        }
    }).catch(err=>{
        // console.log(err);
        res.status(409).json({
           message : `Email Address ${req.body.email} already exist!! please with new one`
        });
    }) ;
    }
    
}

module.exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        let user = await userDATA.find({
            email
        });
        if (!user)
            return res.status(400).json({
                message: "User Not Exist"
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !"
            });

        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(
            payload,
            "deep",
            {
                expiresIn: "1h"
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
}

module.exports.profile = async (req, res, next) => {
    await userDATA.findOne({ token: req.token }, function (err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: user
            });
        }
    });
}

module.exports.updateProfile = async (req, res, next) => {
    salt = 10;
    let password = bcrypt.hashSync(req.body.password, salt);

    await userDATA.findByIdAndUpdate(req.user.id, { fullName: req.body.fullName, password: password, address: req.body.address, phone: req.body.phone }, { new: true }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.user.id
            });
        }
        res.json(user);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.user.id
            });
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.user.id
        });
    })

}


module.exports.forget = async (req, res, next)=>
{
    await userDATA.find({email:req.body.email}, (err, user)=>
    {
        let transporter = nodemailer.createTransport({
            service : 'Gmail',
            auth : {
                user:process.env.email,
                user:process.env.password
            }
        });
        let mailOptions = {
            from: 'mark42virus@gmail.com',
            to: req.body.email,
            subject : 'Password Reset',
            html:"<h1>welcome user!</h1>"

        }

        transporter.sendMail(mailOptions, (err, result)=>
        {
            if(err)
            {
                res.status(424).json({message: "email sending failed"});
            }
            else{
                res.status(200).json({message : "Mail Sent", data : result})
            }
        })
    })
}
