'use strict';

angular.module('fantasyApp.controllers.header', ['fantasyApp.services.login'])
    .controller('HeaderController', ['$scope', '$location', 'loginService', '$firebase', 'FBURL',
      function ($scope, $location, loginService, angularFire, FBURL) {

        $scope.$on("$firebaseAuth:login", function () {
          if ($scope.disassociateUserData) {
            $scope.disassociateUserData();
          }
          $scope.user = angularFire(new Firebase(FBURL + '/users/' + $scope.auth.user.id));
        });

        $scope.logout = function () {
          loginService.logout('/signin');
        };

        $scope.navbarEntries = [
          {
            "title": "NFL Teams",
            "link": "/nflteams"
          },
          {
            "title": "Leagues",
            "link": "/leagues"
          },
          {
            "title": "Players",
            "link": "/players"
          },
          {
            "title": "Fantasy Teams",
            "link": "/fantasyteams"
          }
        ];

        $scope.$on('$routeChangeSuccess', function () {
          $scope.navbarEntries.forEach(
              function (data) {
                data.isActive = ($location.path().indexOf(data.link) == 0);
              }
          )
        })
      }])