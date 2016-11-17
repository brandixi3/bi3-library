'use strict';

angular.module('Bi3DigLib')
	.controller('DashboardCtrl', function($scope, Book, Auth, $location){
		$scope.newbooks = {};
		$scope.loanbooks = {};
        $scope.errors = {};  
        
        $scope.myInterval = 3000;
        
		Book.getNewlyAddedBooks()
            .then(function(res) {
                $scope.newbooks = res.data;
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        Book.getUserOrdersByReturnDate(Auth.getCurrentUser()._id)
            .then(function(res) {
                $scope.loanbooks = res.data;
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });       

        
        
        $scope.viewBook = function(isbn) {
            $location.path("/book/"+isbn);
        }
	});    