var cron = require('node-cron');
var nodemailer = require('nodemailer');
var async = require('async');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/ann-auth-app-dev';



cron.schedule('10 13 * * *', function() {		
	async.waterfall([
	    function databaseConnect(cb) {
	        MongoClient.connect(url, function(err, db) {
	        	console.log("Connected successfully to server");
	        	cb(err, db);
	        });
	    },
	    function getPendingLends(db, cb) {
	    	var collection = db.collection('lendbooks');
			collection.find({$and:[{bookReturnDate:new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() +1  )},{returned:{$ne: true}}]}).toArray(function(err, lendbooks) {
				   
				console.log("Found the following records");
				console.log(lendbooks );
				cb(err, lendbooks);

			});
	    }/*,
	    function sendMail(lendbooks, cb) {
	    	lendbooks.forEach(function(lendbook){
				console.log(lendbook);
	    		var smtpConfig = {
				    host: 'smtp.office365.com',
				    port: 587,
				    auth: {
				        user: 'thisala@brandix.com',
				        pass: 'bi3@0925~'
				    },
				    secureConnection: false, // TLS requires secureConnection to be false
				    tls: {
				        ciphers:'SSLv3'
				    }
				};
				// create reusable transporter object using the default SMTP transport
	            var transporter = nodemailer.createTransport(smtpConfig);

	            // setup e-mail data with unicode symbols
	            var mailOptions = {
	                from: '"Thisal Abeysooriya" <thisala@brandix.com>',
	                to: 'dreadweeper@gmail.com', // list of receivers
	                subject: 'Successfully emailed.', // Subject line
	                //text: '', // plaintext body
	                html:  'Dear <b>' + item.userName + '</b>,</br></br>You have to return the "<b>' + item.bookTitle + '</b>" book on <b>' + moment(item.actualReturnDate-1).format("DD/MM/YYYY") + '</b> to Bi3 Library.</br></br><b>Note:</b></br>' + item.returnedDetail + '</br></br></br>Thank You.</br></br>Best Regards,</br>Thisal Abeysooriya</br></br></br>' // html body
	            };

	            // send mail with defined transport object
	            transporter.sendMail(mailOptions, function(error, info){
	                if(error){
	                    console.log('Message Errored: ' + error);
	                    //cb(error);
	                } else {
	                    console.log('Message Sent: ' + info.response);
	                    //cb(error, lendbook);
	                }
	            });

			});
	    }	*/
	],  function (err, lendbook) {
		console.log('End.');
	});
});