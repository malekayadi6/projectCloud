/**
 * Created by malek on 11/12/16.
 */
var request = require("request");
var MongoClient=require('mongodb').MongoClient;
var MUSAIQUE_FM='musaiqueFm';
var CHAMES_FM='chamesFm';
var RADIO_FM='RadioFm';

var url = "https://graph.facebook.com/mosaiquefm/posts?fields=id,message,created_time&limit=1&access_token=631397940378004|b593651d98bf8c72d54ab38966dda6fd"

var urlChames = "https://graph.facebook.com/ShemsFm.PageOfficielle/posts?fields=id,message,created_time&limit=1&access_token=631397940378004|b593651d98bf8c72d54ab38966dda6fd"
var urlRadio = "https://graph.facebook.com/Radio-IFM/posts?fields=id,message,created_time&access_token=631397940378004|b593651d98bf8c72d54ab38966dda6fd"
var schedule = require('node-schedule');
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

var j=MongoClient.connect(conn_str, function (err, db) {
 schedule.scheduleJob('*/2 * * * *', function() {
        request({
            url: url,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                var query = {'id': body.data[0].id};
                db.collection(MUSAIQUE_FM).findOne(query, function (err, res) {
                    if (!res && !err)
                        db.collection(MUSAIQUE_FM).insertOne(body.data[0], function (err, result) {
                            if (!err)
                                console.log("ajouter novvele poste musiaque FM");
                        });

                    else console.log("no update");


                });
            }
        });

        request({
            url: urlChames,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                var query = {'id': body.data[0].id};
                db.collection(CHAMES_FM).findOne(query, function (err, res) {

                    if (!res && !err)
                        db.collection(CHAMES_FM).insertOne(body.data[0], function (err, result) {
                            if (!err)
                                console.log("ajouter novvele poste chames Fm");
                        });

                    else console.log("no update");
                });

            }
        });

        request({
            url: urlRadio,
            json: true
        }, function (error, response, body) {

            if (!error && response.statusCode === 200) {
                var query = {'id': body.data[0].id};
                db.collection(RADIO_FM).findOne(query, function (err, res) {
                    if (!res && !err)
                        db.collection(RADIO_FM).insertOne(body.data[0], function (err, result) {
                            if (!err)
                                console.log("ajouter novvele poste Radio fm");
                        });
                    else console.log("no update");
                });

            }
        });
    });


 /*************************  likesssssssss ************************************/
    schedule.scheduleJob('*/59 * * * *', function() {
        db.collection('musaiqueFm').find().toArray(function (err, res) {
            if (!err && res)
                forLikes(res, db, MUSAIQUE_FM,'likes', function (resp) {

                });


        });

        db.collection(RADIO_FM).find().toArray(function (err, res) {
            if (!err && res)
                forLikes(res, db, RADIO_FM,'likes', function (resp) {

                });
        });

        db.collection(CHAMES_FM).find().toArray(function (err, res) {
            if (!err && res)
                forLikes(res, db, CHAMES_FM,'likes', function (resp) {

                });


        });
   /************************** les comntairess ********************************/
        db.collection(MUSAIQUE_FM).find().toArray(function (err, res) {
            if (!err && res)
                forComments(res, db, MUSAIQUE_FM,'comments',function (resp) {

                });


        });

        db.collection(RADIO_FM).find().toArray(function (err, res) {
            if (!err && res)
                forComments(res, db, RADIO_FM,'comments',function (resp) {

                });
        });

        db.collection(CHAMES_FM).find().toArray(function (err, res) {
            if (!err && res)
                forComments(res, db, CHAMES_FM,'comments', function (resp) {

                });


        });

    });



console.log("lll");


});

exports.j=j;

function reqLikes(url,res,i,db,c,callback){
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            db.collection(c).update({"id":res[i].id,$or:[ {"likes":{$lt:body.summary.total_count}} , {"likes":{$exists:false}} ] },{ '$set': {likes: body.summary.total_count} }
                ,function (err,result) {

                }

            );


            return callback(body.summary.total_count);

        }
    });

}

function forLikes(res,db,c,monUrl,callback){

    for (var i = 0; i < res.length; i++) {
        var url = "https://graph.facebook.com/" + res[i].id + "/"+monUrl+"?summary=1&limit=0&access_token=631397940378004|b593651d98bf8c72d54ab38966dda6fd"
        reqLikes(url,res,i,db,c,function (response) {

        });

    }
    return callback('bien');


}



function forComments(res,db,c,monUrl,callback){

    for (var i = 0; i < res.length; i++) {

        var url = "https://graph.facebook.com/" + res[i].id + "/"+monUrl+"?summary=1&limit=0&access_token=631397940378004|b593651d98bf8c72d54ab38966dda6fd"
        reqComments(url,res,i,db,c,function (response) {

        });

    }
    return callback('bien');


}

function reqComments(url,res,i,db,c,callback){
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            db.collection(c).update({"id":res[i].id,$or:[ {"comments":{$lt:body.summary.total_count}} , {"comments":{$exists:false}} ] },{ '$set': {comments: body.summary.total_count} }
                ,function (err,result) {

                }

            );


            return callback(body.summary.total_count);

        }
    });

}