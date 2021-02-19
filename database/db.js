const mongoose = require('mongoose');

require('../model/user_model');

var url = "mongodb://localhost:27017/RestroDB"



mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false})
.then(()=>console.log("Connection Done")).catch((err)=>console.log(err));

