'use strict';

var proxy = require('express-http-proxy');
  



module.exports = function (app) {
	app.use('/isbn-images', proxy('images.amazon.com',{
  forwardPath: function(req, res) {

    return '/images/P/'+req.query.isbn+'.jpg';
  }
}));
};