var express = require('express');
var router = express.Router();
var controller = require('./controller/controller');

// Homepage
router.get('/', function(req, res){
  res.sendFile('index.html', {root: 'public'});
});

// Search
router.get( '/api/imagesearch/:SEARCH', controller.search );

router.get( '/api/latest/imagesearch/', controller.find );

module.exports = router;
