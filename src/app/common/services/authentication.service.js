(function(){
  'use strict';

  angular
    .module('socialbook')
    .factory('authenticationService', authenticationService);

    /** @ngInject */
    function authenticationService($window){
      var authenticationService = this;

      // Remember Me - unchecked
      authenticationService.setSessionStorage = function (credentials) {
        $window.sessionStorage.setItem('credentials', credentials);
      };

      // Remember Me - checked
      authenticationService.setLocalStorage = function (credentials) {
        $window.localStorage.setItem('credentials', credentials);
      };

      // Logout
      authenticationService.clearWebStorages = function () {
        $window.localStorage.clear();
        $window.sessionStorage.clear();
      };

      // Check if authenticated
      authenticationService.isLoggedIn = isLoggedIn();

      function isLoggedIn() {
        var sessionStorage = $window.sessionStorage.getItem('credentials');
        var localStorage = $window.localStorage.getItem('credentials');

        console.log(sessionStorage);
        console.log(localStorage);

        if (sessionStorage) {
          return sessionStorage == 'qweqwe';
        } else if (localStorage) {
          return localStorage == 'qweqwe';
        } else {
          return false;
        }
      }

      return authenticationService;
    }

})();
