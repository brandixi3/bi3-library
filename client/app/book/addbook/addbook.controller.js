'use strict';

angular.module('Bi3DigLib')
    .controller('AddBookCtrl', function($scope, Book, $location, $window) {
        
        $scope.book = {};
        $scope.errors = {};
        $scope.donatedBy = {};
        $scope.donationDetail = {};
        

        $scope.catagory = [
            { id: 1, name: 'Non-fiction' },
            { id: 2, name: 'Fiction' },
            { id: 3, name: 'Biographies' },
            { id: 4, name: 'Political Science' },
            { id: 5, name: 'Reference' },
            { id: 6, name: 'Computer Science' }
        ];

        $scope.add = function(form) {
            $scope.submitted = true;
            
            if (form.$valid) {
                if($scope.Donations==true){
                    $scope.donatedBy=$scope.book.donatedBy;
                    $scope.donationDetail=$scope.book.donationDetail;
                }

                else{
                    $scope.donatedBy=undefined;
                    $scope.donationDetail=undefined;
                }
                    Book.save({
                        isbn:$scope.book.isbn,
                        title:$scope.book.title,
                        author:$scope.book.author,
                        publisher:$scope.book.pub,
                        catagory:$scope.book.catagory.name,
                        yearOfPublication:$scope.book.year,
                        totalCopies:$scope.book.tCopy,
                        donatedBy:$scope.donatedBy,
                        donationDetail:$scope.donationDetail,
                        remainingCopies:$scope.book.tCopy,
                        detail:$scope.book.detail,
                        image:'http://images.amazon.com/images/P/' + $scope.book.isbn +'.jpg',
                        dateAdded:new Date()
                        
                    })
                    .then(function() { 
                        $location.path('/bookadmin');
                    })
                    .catch(function(err,data) {
                         console.log(err,data);
                         console.log("aaa "+err.data);
                        $scope.errors = err.data;
                        console.log($scope.errors);

                    });

                
                   /* Book.save({
                        isbn:$scope.book.isbn,
                        title:$scope.book.title,
                        author:$scope.book.author,
                        publisher:$scope.book.pub,
                        catagory:$scope.book.catagory.name,
                        yearOfPublication:$scope.book.year,
                        totalCopies:$scope.book.tCopy,
                        donatedBy:$scope.book.donatedBy,
                        donationDetail:$scope.book.donationDetail,
                        remainingCopies:$scope.book.tCopy,
                        detail:$scope.book.detail,
                        dateAdded:new Date()
                        
                    })*/
                    /*.then(function() { 
                        $location.path('/bookadmin');
                    })
                    .catch(function(err,data) {
                         console.log(err,data);
                         console.log("aaa "+err.data);
                        $scope.errors = err.data;
                        console.log($scope.errors);

                    });*/
                }
            }
   
    });