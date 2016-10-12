angular.module('Bi3DigLib')
    .controller('UpdateCtrl', function($scope, Book, Auth, $stateParams, $location) {

        $scope.book = {};
        $scope.errors = {};
        
        $scope.catagory = [
            { id: 1, name: 'Non-fiction' },
            { id: 2, name: 'Fiction' },
            { id: 3, name: 'Biographies' }
        ];       
       
        $scope.update = function(form) {
            $scope.submitted = true;

                Book.update({
                		_id:$scope.book._id,
                        isbn:$scope.book.isbn,
                        title:$scope.book.title,
                        author:$scope.book.author,
                        publisher:$scope.book.publisher,
                        catagory:$scope.book.catagory.name,
                        yearOfPublication:$scope.book.yearOfPublication,
                        totalCopies:$scope.book.totalCopies, 
                        remainingCopies:$scope.book.totalCopies - $scope.prevTotalCount  + $scope.book.remainingCopies, //1
                        detail:$scope.book.detail,
                        dateUpdated:new Date()
                    })

                    .then(function() { 
                       
                        $location.path('/bookadmin');

                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });
        }; 

        Book.findByIsbn($stateParams.isbn)
            .then(function(res) {
                $scope.book = res.data[0];
                $scope.selectedUser = res.data[0].catagory;
                $scope.book.catagory = _.find($scope.catagory,function (item) {
                    return $scope.book.catagory === item.name; 
                });
                $scope.prevTotalCount = res.data[0].totalCopies;
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });
        });
