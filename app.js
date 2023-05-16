var express = require('express');
var app = express();
var dotenv = require('dotenv');
dotenv.config();
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

var mongoUrl = process.env.MongoLiveUrl;
var port = process.env.PORT || 9592;
var db;

//default routing
app.get('/', (req, res) => {
    res.send('This is default route');
})

app.get('/movies', (req, res) => {
    db.collection('movies').find().toArray((err, result)=>{
        if(err) throw err;
        res.send(result);
    })
})

//connecting to mongodb
MongoClient.connect(mongoUrl, (err, client) => {
    if(err) console.log('error while connecting to mongodb');
    db = client.db('augintern');
    app.listen(port, ()=>{
        console.log(`listening to port ${port}`);
    })
})