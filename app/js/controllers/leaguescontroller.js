'use strict';
 
angular.module('fantasyApp.controllers.leagues', ['fantasyApp.services.leagues'])
  .controller('LeaguesController', ['$scope','$routeParams', '$location', 'Leagues', '$firebase',
    function($scope, $routeParams, $location, Leagues, $firebase) {
 
      $scope.league = {};
      $scope.leagueId = $routeParams.leagueId;
 
      $scope.findLeagues = function() {
        $scope.leagues = $firebase(Leagues.collection());
      }
 
      $scope.findOneLeague = function (leagueId) {
        if(!!$scope.leagueId) {
          $firebase(Leagues.find($routeParams.leagueId)).$bind($scope, 'league');
        }
      }
 
      $scope.createLeague = function() {
        var leagueId = Leagues.create($scope.league, $scope.auth.user, function(err) {
          if (!err) {
            $scope.league = null;
            $location.path('/leagues/'+leagueId);
            $scope.$apply();
          }
        });
        $scope.league = null;
        $location.path('/leagues/'+leagueId);
      }
 
      $scope.removeLeague = function(leagueId) {
        Leagues.removeLeague(leagueId);
      }
    }])