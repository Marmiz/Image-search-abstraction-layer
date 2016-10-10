var Bing = require('node-bing-api')({ accKey: process.env.API_KEY });


exports.search = function (req, res){

  /* set variables */
  var search = req.params.SEARCH;
  var term = decodeURIComponent(search);
  var db = req.db;
  var latest = db.collection('latest');
  var date = new Date;
  var offset = req.query.offset || 0;

  console.log(process.env.API_KEY);

  /* insert the search into the db. */
  latest.insert({ term: term, when: date });

 Bing.images(search, {top: 10, skip: offset}, function(error, respose, body){
    // error
    if (error){
      console.error(error);
      return res.status(500).end(error.message);
    }
    //  map inside the body to extract the values
    res.json( body.d.results.map( function (obj) {
      return {
        alt: obj.Title,
        page: obj.SourceUrl,
        image: obj.MediaUrl
      }
    }));
    //res.json
  });
};
// search export

exports.find = function (req, res){
  /* Set db varaibles */
  var db = req.db;
  var latest = db.collection('latest');

  latest.find().limit(10).sort({'when': -1}).toArray(function(error, result){
    if (error){
      console.error(error);
      return res.status(500).end(error.message);
    }
    // render the db data
    res.json( result.map( function (obj){
      return {
        term: obj.term,
        when: obj.when
      }
    }));

  });

};
// find export
