'use strict';

/* Services */

angular.module('fantasyApp.services.login', ['fantasyApp.services.profileCreator'])
    .factory('loginService', ['profileCreator', '$location', '$rootScope',
      function (profileCreator, $location, $rootScope) {
        return {
          login: function (email, pass, redirect, callback) {
            var p = $rootScope.auth.$login('password', {
              email: email,
              password: pass,
              rememberMe: true
            });
            p.then(function (user) {
              if (redirect) {
                $location.path(redirect);
              }
              callback && callback(null, user);
            }, function (err) {
              callback(err)
            });
          },
          logout: function (redirectPath) {
            $rootScope.auth.$logout();
            if (redirectPath) {
              $location.path(redirectPath);
            }
          },
          createAccount: function (name, email, pass, callback) {
            $rootScope.auth.$createUser(email, pass, function (err, user) {
              if (callback) {
                callback(err, user);
                $rootScope.$apply();
              }
            });
          },
          createProfile: profileCreator
        }
      }]);
