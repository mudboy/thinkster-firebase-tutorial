'use strict';

angular.module('fantasyApp.controllers.players', ['fantasyApp.services.players'])
    .controller('PlayersController', ['$scope', '$routeParams', '$firebase', 'NFL', 'Players',
      function ($scope, $routeParams, $firebase, NFL, Players) {

        $scope.positions = NFL.positions;

        $scope.nflteams = NFL.teams;

        $scope.searchsize = {
          "limit": 10
        };

        $scope.strictsearch = {};

        $scope.findPlayers = function () {
          $scope.players = $firebase(Players.collection());
        };

        $scope.findOnePlayer = function () {
          $firebase(Players.find($routeParams.playerId)).$bind($scope, 'player');
        };

        $scope.comp = function(expected, actual) {
          if (actual === "")
            return true;
          return angular.equals(expected, actual);
        };

        $scope.reverse = false;

        $scope.getArrow = function() {
          if ($scope.reverse)
            return "arrow-up"
          return "arrow-down"
        }

        $scope.order = 'name';
      }]);