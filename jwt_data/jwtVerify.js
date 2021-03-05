const jwt = require('jsonwebtoken');


// let tokenData = '';

// module.exports.tokenVerfication = (req, res, next) => {
//     var token;
//     if ('authorization' in req.header) {
//         token = req.header['authorization'].split(' ')[1];

//     }
//     if (!token) {
//         return res.status(403).send({ auth: false, message: 'No token provided.' });

//     } else {
//         jwt.verify(token, 'deep', (err, decodedData) => {
//             if (err) {
//                 return res.status(500).send({ auth: false, message: 'Token authentication failed.' });

//             } else {
//                 tokenData = decodedData;
//                 req._id = tokenData.data[0];
//                 next();
//             }
//         })
//     }

// var token = req.header("token", token);
// if (!token) return res.status(401).json({ message: "Authentication Failed - Token Not Provided" });

// try {
//     const decoded = jwt.verify(token, "deep");
//     req.user = decoded.user;

//     next();
// } catch (e) {
//     console.error(e);
//     res.status(500).send({ message: "Invalid Token" });

// }





var tokenValue = '';
module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    if ('token' in req.headers)
        token = req.headers['token'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, 'deep',
            (err, decoded) => {

                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    tokenValue = decoded;
                    req._id = tokenValue.data[0]


                    next();
                }
            }
        )
    }
}

module.exports.tokenValidation = (req, res, next) => {
    var token = req.header("token", token);
    if (!token) return res.status(401).json({ message: "Authentication Failed - Token Not Provided" });

    try {
        const decoded = jwt.verify(token, "deep");
        req.user = decoded.user;
        next();
    } catch (e) {
        console.error(e);
        res.status(500).send({ message: "Invalid Token" });

    }
}