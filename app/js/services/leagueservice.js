'use strict';
 
angular.module('fantasyApp.services.leagues', ['fantasyApp.services.firebaseRefs'])
  .factory('Leagues', ['FireRef', '$firebase', 'FBURL', 'Firebase',
    function(FireRef, $firebase, FBURL, Firebase) {
      return {
        collection: function(cb) {
          return FireRef.leagues();
        }, 

        find: function(leagueId) {
          return new Firebase(FBURL + '/leagues/' + leagueId);
        }, 

        create: function(league, commissioner, cb) {
         return FireRef.leagues().push({
            name: league.name,
            commissionerId: commissioner.id,
            fantasyTeams: []
          }, cb).name();
        }, 

        removeLeague: function(leagueId) {
          var league = FireRef.leagues().child('/'+leagueId)
          league.remove();
        }
      }
    }])