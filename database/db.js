const mongoose = require('mongoose');



var url = "mongodb://localhost:27017/RestroDB"



mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log("Connection Done")).catch((err)=>console.log(err))

