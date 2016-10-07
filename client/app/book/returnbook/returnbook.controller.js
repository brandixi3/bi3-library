'use strict';

angular.module('Bi3DigLib')
    .controller('ReturnBookCtrl', function($scope, Book, $location, $window) {
        $scope.returnbooks = {};
        $scope.errors = {};

        Book.getReturnBookList()
            .then(function(res) {
                $scope.returnbooks = res.data;
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        $scope.returnBook = function(loanbookObj) {
            var dayDiff = Math.floor((new Date() - new Date(loanbookObj.bookReturnDate)) / (1000 * 60 * 60 * 24));
            var fine = parseFloat((dayDiff)*50).toFixed(2);
            loanbookObj.fine = fine > 0 ? fine : 0;
            loanbookObj.actualReturnDate = new Date();
            
            Book.returnBook(loanbookObj)
                .then(function() { 
                    
                })
                .catch(function(err) {
                    $scope.errors.other = err.message;
                });
            }
              
        
        
    });