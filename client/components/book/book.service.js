'use strict';

angular.module('Bi3DigLib')
  .factory('Book', function Book($location, $rootScope, $http, $cookieStore, $q) {

      function findOne(id) {
          return $http.get('/api/books/'+id);
      }
      function findByIsbn(isbn) {
          return $http.get('/api/books/isbn/'+isbn);
      }
      function find() { 
          return $http.get('/api/books/'); 
      }
      function save(bookObj) { 
          return $http.post('/api/books/',bookObj);
      }
      function update(bookObj) { 
        console.log("hdfsd");
          return $http.post('/api/books/update/'+bookObj.isbn ,bookObj);
      }

      function lendBook(lendBookObj) { 
          return $http.post('/api/books/lend/',lendBookObj);
      }
      
      return {
        findOne:findOne,
        findByIsbn:findByIsbn,
        find:find,
        save:save,
        lendBook:lendBook,
        update:update
      };
});