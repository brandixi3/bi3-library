angular.module('Bi3DigLib')
    .controller('UpdateCtrl', function($scope, Book, Auth, $stateParams, $location) {

        $scope.book = {};
        $scope.errors = {};
       // $scope.loggedInUser = {};       
        

            $scope.update = function(form) {
            $scope.submitted = true;
//$location.path('/dashboard');
           // if (form.$valid) {
           	//alert($scope.book._id);
                Book.update({
                		_id:$scope.book._id,
                        isbn:$scope.book.isbn,
                        title:$scope.book.title,
                        author:$scope.book.author,
                        publisher:$scope.book.publisher,
                        catagory:$scope.book.catagory,
                        yearOfPublication:$scope.book.yearOfPublication,
                        totalCopies:$scope.book.totalCopies,
                        remainingCopies:$scope.book.totalCopies,
                        detail:$scope.book.detail
                    })
                    .then(function() { 
                        $location.path('/dashboard');
                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });
           // }
        }; 

        Book.findByIsbn($stateParams.isbn)
            .then(function(res) {
                $scope.book = res.data[0];
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        });
