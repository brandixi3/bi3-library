'use strict';

angular.module('Bi3DigLib')
    .controller('AddBookCtrl', function($scope, Book, $location, $window) {
        $scope.book = {};
        $scope.errors = {};

        $scope.catagory = [
            { id: 1, name: 'Non-fiction' },
            { id: 2, name: 'Fiction' },
            { id: 3, name: 'Biographies' }
        ];



        $scope.add = function(form) {
            $scope.submitted = true;
            
            if (form.$valid) {
                Book.save({
                        isbn:$scope.book.isbn,
                        title:$scope.book.title,
                        author:$scope.book.author,
                        publisher:$scope.book.pub,
                        catagory:$scope.book.catagory.name,
                        yearOfPublication:$scope.book.year,
                        totalCopies:$scope.book.tCopy,
                        remainingCopies:$scope.book.tCopy,
                        detail:$scope.book.about/*,
                        image:$scope.book.image*/
                    })
                    .then(function() { 
                        $location.path('/books');
                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });
            }
        }; 
    });