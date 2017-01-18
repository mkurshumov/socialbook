(function () {
  'use strict';

  angular
    .module('socialbook')
    .factory('authenticationService', authenticationService);

  /** @ngInject */
  function authenticationService(webStoragesService) {
    var authenticationService = this;

    // Check if authenticated
    authenticationService.isLoggedIn = isLoggedIn();

    function isLoggedIn() {
      if (webStoragesService.getItemFromStorages('access_token')) {
        return true;
      } else {
        return false;
      }
    }

    return authenticationService;
  }

})();
