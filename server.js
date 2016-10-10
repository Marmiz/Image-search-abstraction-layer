var express = require('express');
var app = express();

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.DB_URL;

MongoClient.connect(url, function(err, db){
  if (err) console.log('Unable to connect to the database', err);
  else console.log('Connected to Test db', url);

  // pass the db to each request
  app.use( function(req, res, next){
    req.db = db;
    next();
  });

  app.use( require('./routes'));

});



app.listen(process.env.PORT || 3000, function () {
  console.log('ready to serve!');
});
