var express = require('express');
var app = express();
var dotenv = require('dotenv');
dotenv.config();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

var mongoUrl = process.env.MongoLiveUrl;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(cors());
var port = process.env.PORT || 9592;
var db;

//default routing
app.get('/', (req, res) => {
    res.send('This is default route');
})

app.get('/movies', (req, res) => {
    console.log('Movies')
    db.collection('movies').find().toArray((err, result)=>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/add-movies', (req, res) => {
    if(req.body.name && req.body.rating && 
        req.body.releaseDate && req.body.image){
            db.collection('movies').insertOne(req.body, (err, result) => {
                if(err) throw err;
                res.send({status: 200, message: 'Data Inserted Successfully'});
            })
    }
    else{
        res.send({status: 400, error: 'Invalid Data'});
    }
    
})

//connecting to mongodb
MongoClient.connect(mongoUrl, (err, client) => {
    if(err) console.log('error while connecting to mongodb');
    db = client.db('augintern');
    app.listen(port, ()=>{
        console.log(`listening to port ${port}`);
    })
})