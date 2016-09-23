'use strict';

angular.module('AnnAuthApp')
  .factory('Book', function Book($location, $rootScope, $http, $cookieStore, $q) {

      function findOne(id) {
          return $http.get('/api/books/'+id);
      }
      function find() { 
          return $http.get('/api/books/'); 
      }
      function save(bookObj) { 
          return $http.post('/api/books/',bookObj);
      }
      
      return {
        findOne:findOne,
        find:find,
        save:save
      };
});