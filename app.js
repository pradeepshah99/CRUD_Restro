const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())


const server = app.listen(port,()=>console.log(`server running at port ${port}`));