'use strict';
 
var Thing = require('../api/tenants/tenants.model');
 
Thing.find({}).remove(function() {
  Thing.create({
    name: 'Test Book',
    isbn: '12345ab5678herhf',
    title: 'abcBy',
    author: 'Mr.Abc',
    publisher: 'Testing',
    catagory: 'Test'
  },
   function() {
      console.log('finished populating users');
    }
  );
});