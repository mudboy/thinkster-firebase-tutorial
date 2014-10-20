'use strict';

angular.module('fantasyApp.controllers.leagues', ['fantasyApp.services.leagues', 'fantasyApp.services.players'])
    .controller('LeaguesController', ['$scope', '$routeParams', '$location', 'Leagues', '$firebase', 'Players',
      function ($scope, $routeParams, $location, Leagues, $firebase, Players) {

        $scope.league = {};
        $scope.leagueId = $routeParams.leagueId;

        $scope.findLeagues = function () {
          $scope.leagues = $firebase(Leagues.collection());
        };

        $scope.findOneLeague = function (leagueId) {
          if (!!$scope.leagueId) {
            $firebase(Leagues.find($routeParams.leagueId)).$bind($scope, 'league');
            $firebase(Players.find($scope.league.commissionerId)).$bind($scope, 'player');
          }
        };

        $scope.createLeague = function () {
          var leagueId = Leagues.create($scope.league, $scope.auth.user, function (err) {
            if (!err) {
              $scope.league = null;
              $location.path('/leagues/' + leagueId);
              $scope.$apply();
            }
          });
          $scope.league = null;
          $location.path('/leagues/' + leagueId);
        };

        $scope.removeLeague = function (leagueId) {
          Leagues.removeLeague(leagueId);
        }
      }]);