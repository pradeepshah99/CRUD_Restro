const productData = require('../model/productSchema');

module.exports.createProduct = (req, res) => {
        // validation of products request
        if (!req.body) {
            return res.status(400).send({
                message: "this can't be empty"
            });
        }

        // creating products

        let products = new productData({
            title: req.body.title || "No product title",
            description: req.body.description,
            price: req.body.price,
            company: req.body.company
        });

        products.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Something wrong while creating the product."
                });
            })
    }
    // retreive all products

module.exports.findAllProducts = (req, res) => {
    productData.find().then(products => {
        res.send(products)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving products."
        });

    });
}

// get single products

module.exports.findOneProduct = (req, res) => {
    productData.findById(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving product with id " + req.params.productId
            });
        });
};

// Update a product
module.exports.updateProduct = (req, res) => {
    // Validate Request
    if (!req.body) {
        return res.status(400).send({
            message: "Product content can not be empty"
        });
    }

    // Find and update product with the request body
    productData.findByIdAndUpdate(req.params.productId, {
            title: req.body.title || "No product title",
            description: req.body.description,
            price: req.body.price,
            company: req.body.company
        }, { new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send(product);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.productId
            });
        });
};

// Delete a note with the specified noteId in the request
module.exports.deleteProduct = (req, res) => {
    productData.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            res.send({ message: "Product deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Product not found with id " + req.params.productId
                });
            }
            return res.status(500).send({
                message: "Could not delete product with id " + req.params.productId
            });
        });
};