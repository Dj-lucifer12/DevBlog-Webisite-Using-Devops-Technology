require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_middleware/error-handler');
const path=require("path");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use("/users",express.static('public'));
app.use("/",express.static('public'))
// app.use('/assets',express.static('css'));

// api routes
app.get('/',function(req,res){
    res.sendFile(__dirname+ '/public/index.html');
});
app.get('/registration',function(req,res){
    res.sendFile(__dirname+ '/public/Registration.html');
});
app.get('/login',function(req,res){
    res.sendFile(__dirname+ '/public/Login.html');
});

app.use('/users', require('./users/users.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));