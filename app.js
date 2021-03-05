require('./database/db');

const express = require('express');

const app = express();


const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const port = process.env.PORT || 5000;
const controllerAdmin = require('./routes/adminRoute');
const controllerIndex = require('./routes/router')



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', controllerIndex);

app.use('/api/admin', controllerAdmin);




const server = app.listen(port, () => console.log(`server running at port ${port}`));