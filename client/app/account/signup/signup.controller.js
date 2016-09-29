'use strict';

angular.module('Bi3DigLib')
    .controller('SignUpCtrl', function($scope, Auth, $location, $window) {
        $scope.user = {};
        $scope.errors = {};

        $scope.signUp = function(form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.createUser({
                        name: $scope.user.name,
                        email: $scope.user.email,
                        password: $scope.user.password
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
