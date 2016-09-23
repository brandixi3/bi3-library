'use strict';

angular.module('AnnAuthApp')
    .controller('BookCtrl', function($scope, Book, $location, $window) {
        $scope.book = {};
        $scope.errors = {};

        $scope.add = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                Book.save({
                        isbn:$scope.book.isbn,
                        title:$scope.book.title,
                        author:$scope.book.author,
                        publisher:$scope.book.pub,
                        catagory:$scope.book.cat,
                        yearOfPublication:$scope.book.year,
                        totalCopies:$scope.book.tCopy
                        
                    })
                    .then(function() { 
                        $location.path('/');
                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });
            }
        }; 
    });