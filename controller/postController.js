var postData = require('../model/postSchema');

module.exports.create = async(req, res, next) => {
    let post = new postData();
    post.email = req.body.email;
    post.postTitle = req.body.postTitle;
    post.postSub = req.body.postSub;
    post.postContent = req.body.postSub;

    if (!req.body.email || !req.body.postTitle || !req.body.postSub || !req.body.postSub) {
        res.status(401).json({ message: "All Field are Mandatory" });

    } else {
        await post.save().then((err, result) => {
            if (err) {
                res.json(err);
            } else {
                res.status(200).json({ message: "Post saved successfully", Result: result });

            }
        }).catch(err => {
            console.log("Some Error");
        })
    }
}

module.exports.getPost = async(req, res, next) => {
    await postData.find({ token: req.token }, function(err, user) {
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