/**
 * Created by malek on 11/12/16.
 */
var MUSAIQUE_FM='musaiqueFm';
var CHAMES_FM='chamesFm';
var RADIO_FM='RadioFm';
var script = require('./scriptAdd');
var express=require('express');
var app=express();
script.j;
var MongoClient=require('mongodb').MongoClient;


app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/node_modules'));
var mongo = process.env.VCAP_SERVICES;
var conn_str = "";
if (mongo) {
    var env = JSON.parse(mongo);
    if (env['mongodb']) {
        mongo = env['mongodb'][0]['credentials'];
        if (mongo.url) {
            conn_str = mongo.url;
        } else {
            console.log("No mongo found");
        }
    } else {
        conn_str = 'mongodb://localhost:27017/facebook';
    }
} else {
    console.log("No mongo found");
    conn_str = 'mongodb://localhost:27017/facebook';
}

MongoClient.connect(conn_str, function (err, db) {


    app.get("/api/musaiquefm",function (req,res) {



        db.collection(MUSAIQUE_FM).find().toArray(function (err,data) {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }


        });
    });
    app.get("/api/chamesfm",function (req,res) {



        db.collection(CHAMES_FM).find().toArray(function (err,data) {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }


        });
    });
    app.get("/api/radiofm",function (req,res) {


        db.collection(RADIO_FM).find().toArray(function (err,data) {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                res.json(data);
            }


        });
    });




});

app.get('/', function(req, res) {
    res.sendfile('./client/index.html');

});



var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;
app.listen(port);
/*
app.listen(8888,function () {

});*/
