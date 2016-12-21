'use strict';

var proxy = require('express-http-proxy');
  



module.exports = function (app) {
	app.use('/isbn-images', proxy('images.amazon.com',{
		timeout:5000,
  forwardPath: function(req, res) {
  	console.log('/images/P/'+req.query.isbn+'.jpg');
    return '/images/P/'+req.query.isbn+'.jpg';
  }
}));
};