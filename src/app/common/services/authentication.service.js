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

      return authenticationService
    }

})();
