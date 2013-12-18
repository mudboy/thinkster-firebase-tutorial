'use strict';
 
angular.module('fantasyApp.services.players', ['fantasyApp.services.firebaseRefs'])
  .factory('Players', ['FBURL', 'Firebase', 'FireRef',
    function(FBURL, Firebase, FireRef) {
      return {
        collection: function() {
          return FireRef.players();
        }
      , find: function(playerId) {
          return FireRef.players().child(playerId);
        }
      }
    }])