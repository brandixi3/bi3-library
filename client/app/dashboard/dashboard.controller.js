'use strict';

angular.module('Bi3DigLib')
	.controller('DashboardCtrl', function($scope, Book, Auth, $location, $window, $timeout){
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

            if(false && Auth.getCurrentUser()._id==undefined){
                //$window.location.reload();
            }
            else{
                $timeout(function () {
                  
        Book.getUserOrdersByReturnDate(Auth.getCurrentUser()._id)
            .then(function(res) {
                $scope.loanbooks = res.data;
                console.log("xx "+Auth.getCurrentUser()._id);
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });       
                },2000);  

}
        
        $scope.viewBook = function(isbn) {
            $location.path("/book/"+isbn);
        }
	});    