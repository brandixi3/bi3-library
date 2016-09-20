'use strict';

angular.module('AnnAuthApp', [
        'ngCookies',
        'ngResource',
        'ui.router',
        'ngMessages',
        'ui.bootstrap',
        'ngMaterial',
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('authInterceptor');
    })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
    return { 
        request: function(config) {
            config.headers = config.headers || {};
            if ($cookieStore.get('token')) {
                config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
            }
            return config;
        },
 
        responseError: function(response) {
            if (response.status === 401) {
                $location.path('/login');
                // remove any stale tokens
                $cookieStore.remove('token');
                return $q.reject(response);
            } else {
                return $q.reject(response);
            }
        }
    };
})

.run(function($rootScope, $location, Auth, $window) {
        var localhost = $window.location.host.indexOf('localhost') >= 0;
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function(event, next) {
            Auth.isLoggedInAsync(function(loggedIn) {
                if (!localhost && next.authenticate && !loggedIn) {
                    $location.path('/login');
                }
            });
        });
    }) 
    .directive('selectOnFocus', function($timeout) {
        return {
            link: function(scope, element) {
                element.focus(function() {
                    $timeout(function() {
                        element[0].select();
                    });
                });
            }
        };
    })
    .filter('mformat', function($window) {
        return function(date, format) {
            return $window.moment(date).format(format);
        };
    });
