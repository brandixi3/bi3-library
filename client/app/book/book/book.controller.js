'use strict';

angular.module('Bi3DigLib')
    .controller('BookCtrl', function($scope, Book, Auth, $stateParams, $location) {

        $scope.book = {};
        $scope.errors = {};
        $scope.loggedInUser = {};

        Book.findByIsbn($stateParams.isbn)
            .then(function(res) {
                $scope.book = res.data[0];
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        $scope.lendBook = function(form) {

            $scope.submitted = true;

            $scope.loggedInUser = Auth.getCurrentUser();

            if (form.$valid) {
                var returnDate = new Date();
                returnDate.setDate(returnDate.getDate() + 7);

                Book.lendBook({
                        userId: $scope.loggedInUser._id,
                        userName: $scope.loggedInUser.name,
                        userEmail: $scope.loggedInUser.email,
                        userRole: $scope.loggedInUser.role,
                        userProvider: $scope.loggedInUser.provider,
                        bookId: $scope.book._id,
                        bookIsbn: $scope.book.isbn,
                        bookTitle: $scope.book.title,
                        bookAuthor: $scope.book.author,
                        bookPublisher: $scope.book.publisher,
                        bookCategory: $scope.book.category,
                        bookYearOfPublication: $scope.book.yearOfPublication,
                        bookBorrowedDate: new Date(),
                        bookReturnDate: returnDate,
                        fine: 122.54
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