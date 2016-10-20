'use strict';

angular.module('Bi3DigLib')
	.controller('DashboardCtrl', function($scope, Book, Auth){
		$scope.newbooks = {};
		$scope.loanbooks = {};
        $scope.errors = {};  

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

        $scope.calculateFine = function(returnDate) {
            var dayDiff = Math.floor((new Date() - new Date(returnDate)) / (1000 * 60 * 60 * 24));
            var fine = parseFloat((dayDiff)*50).toFixed(2);
              
            return fine > 0 ? fine : ("N/A");
              
        }
	});    