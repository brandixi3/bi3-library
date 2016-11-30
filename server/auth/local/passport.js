var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

/*exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'This email is not registered.' });
        }
        if (!user.authenticate(password)) {
          return done(null, false, { message: 'This password is not correct.' });
        }
        return done(null, user);
      });
    }
  ));

};*/

var LdapStrategy = require('passport-ldapauth');
var express = require('express');
var app = express();
var User = require('mongoose').model('User');
const util = require('util')
 


var loginSuccess = function(userLdap, done) {
    var role='';
      if(userLdap.displayName=='Bi3 Teamwork'){
          role= 'admin';
        }
      else{
          role='user';
        }
  
// alternative shortcut
        User.findOne({
            email: userLdap.mail.toString().toLowerCase()
        }, function(err, user) {
        if (err) {
          // return done(err);
          console.log("err");
          
        }
        if (!user) {
              user = new User({
              name: userLdap.displayName,
              role: role,
              email: userLdap.mail,
              provider: 'ldap'
          });
          user.save(function(err) {
              return done(err, user); // Error happens here
          });
        } else {
              return done(err, user); // Error happens here

        }
      });
    };

module.exports = function() {
  console.log("gdgd ");
      passport.use(new LdapStrategy({
        server: {
        url: 'ldap://10.228.20.12:389',  
        bindDn: 'CN=Bi3 Teamwork,OU=User,OU=BI3,OU=Brandix Users,DC=brandixlk,DC=org ',
        bindCredentials: 'TW@brandix',
        searchBase: 'OU=Users,OU=Bi3,OU=Brandix User,DC=brandix,DC=org',
        searchFilter: '(mail={{username}})',
        searchAttributes: ['mail','displayName']
      },    
      
      usernameField: 'email',
      passwordField: 'password'
      }, loginSuccess
  ));
 
  passport.serializeUser(function(user, done) {
    console.log("asa "+user._id);
    done(null, user._id);
    
  });
   
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id 
    }).exec(function(err, user) {
        done(err, user);
        });
    });

};