'use strict';
 
angular.module('fantasyApp.controllers.fantasyTeams', ['fantasyApp.services.fantasyTeams'])
  .controller('FantasyTeamsController', ['$scope','$routeParams', '$location', '$firebase', 'Leagues', 'FantasyTeams',
    function($scope, $routeParams, $location, $firebase, Leagues, FantasyTeams) {
 
      $scope.fantasyTeamId = $routeParams.fantasyTeamId;
      $scope.noFantasyTeam = !$routeParams.fantasyTeamId;
 
      $scope.findFantasyTeams = function() {
        $scope.fantasyTeams = $firebase(FantasyTeams.collection());
      };
 
      $scope.findOneFantasyTeam = function () {
        if(!!$scope.fantasyTeamId) {
          $firebase(FantasyTeams.find($routeParams.fantasyTeamId)).$bind($scope, 'fantasyTeam');
        }
      };
 
      $scope.findLeagues = function () {
        $scope.leagues = $firebase(Leagues.collection());
      }
 
      $scope.create = function() {
        FantasyTeams.create($scope.fantasyTeam, $scope.auth.user).then(function(fantasyTeamId) {
          $scope.fantasyTeam = null;
          $location.path('/fantasyteams/'+fantasyTeamId);
        })
      }
 
      $scope.removeFantasyTeam = function(fantasyTeamId) {
        FantasyTeams.removeFantasyTeam(fantasyTeamId);
      }
    }]);