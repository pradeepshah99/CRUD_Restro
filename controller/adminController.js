const adminData = require('../model/adminSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userData = require('../model/user_model')


module.exports.adminReg = async(req, res, next) => {



    let admin = new adminData();
    admin.fullName = req.body.fullName;
    admin.email = req.body.email;
    admin.password = req.body.password;
    admin.address = req.body.address;
    admin.phone = req.body.phone;
    admin.adhar = req.body.adhar;

    if (!req.body.fullName || !req.body.email || !req.body.password || !req.body.address || !req.body.phone || !req.body.adhar) {
        res.status(401).json({ message: "All Field are Mandatory" });
    } else {

        await admin.save().then((err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.status(200).json({ message: "Data saved successfully", Result: result });
            }
        }).catch(err => {
            // console.log(err);
            res.status(409).json({
                message: `Email Address  ${req.body.email} and Adhar Number ${req.body.adhar} already exist!! please with new one`,
                // message: `Email Address and Adhar Number ${req.body.adhar} already exist!! please with new one`

            });
        });
    }

}

module.exports.adminLogin = async(req, res) => {


    const { email, password } = req.body;
    try {
        let user = await adminData.findOne({
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
            "deep", {
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

module.exports.adminProfile = async(req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await adminData.findById(req.user.id);
        res.json({ message: `User has been fetched of id ${req.user.id}`, data: user });
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
}

module.exports.findallUser = async(req, res) => {
    await userData.find().then((err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json({ message: `all data fetched of users`, result });
        }
    }).catch(err => {
        res.send(err);
    })
}

module.exports.updateUser = async(req, res) => {
    let salt = 10;
    password = await bcrypt.hashSync(req.body.password, salt);
    await userData.findByIdAndUpdate(_id = req.params.id, { fullName: req.body.fullName, email: req.body.email, password: password, address: req.body.address, phone: req.body.phone }, { new: true }).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }
        res.json(user);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.id
        });
    });
}

module.exports.deleteUser = async(req, res) => {
    await userData.findByIdAndDelete({ _id: req.params.id }).then((err, result) => {
        if (err) {
            res.send({ message: "something wrong" })
        } else {
            res.status(200).json({
                message: `user deleted of the id ${req.params.id}`,
                data: result
            })
        }
    }).catch(err => {
        res.send(err);
    })
}