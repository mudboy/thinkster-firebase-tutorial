'use strict';

angular.module('fantasyApp.controllers.signin', ['fantasyApp.services.login'])
    .controller('SigninCtrl', ['$scope', 'loginService', '$location',
      function ($scope, loginService, $location) {

        if (!!$scope.auth.user) {
          $location.path('/');
        }

        $scope.$on('$firebaseAuth:login', function () {
          $location.path('/');
        })

        $scope.email = null;
        $scope.pass = null;
        $scope.name = null;

        $scope.login = function (callback) {
          $scope.err = null;
          loginService.login($scope.email, $scope.pass, '/', function (err, user) {
            $scope.err = err || null;
            typeof(callback) === 'function' && callback(err, user);
          });
        }
      }])
  