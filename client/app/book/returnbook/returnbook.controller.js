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

        $scope.returnHistory = function() {
            $location.path("/returnhistory");
        }

        $scope.returnBook = function(loanbookObj) {
            var dayDiff = Math.floor((new Date() - new Date(loanbookObj.bookReturnDate)) / (1000 * 60 * 60 * 24));
            var fine = parseFloat((dayDiff)*50).toFixed(2);
            loanbookObj.fine = fine > 0 ? fine : 0;
            loanbookObj.actualReturnDate = new Date();
            
            Book.returnBook(loanbookObj)
                .then(function() { 
                    $window.location.reload();
                })
                .catch(function(err) {
                    $scope.errors.other = err.message;
                });
        }

        $scope.calculateFine = function(returnDate) {
            var dayDiff = Math.floor((new Date() - new Date(returnDate)) / (1000 * 60 * 60 * 24));
            var fine = parseFloat((dayDiff)*50).toFixed(2);
            return fine > 0 ? fine : ("N/A");              
        }  
    });