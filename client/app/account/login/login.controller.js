'use strict';

angular.module('Bi3DigLib')
    .controller('LoginCtrl', function($scope, Auth, $location, $window) {
        $scope.user = {};
        $scope.errors = {};
        $scope.loggedInUser = {};

        $scope.login = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                /*Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })*/
                    Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function() { 
                        //console.log(_id);
                        $location.path('/');
                    })
                    .catch(function(err) {
                        $scope.errors.other = err.message;
                    });

            }
        }; 
    });
