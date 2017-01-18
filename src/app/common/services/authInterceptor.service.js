(function () {
  'use strict';

  angular
    .module('socialbook')
    .factory('AuthInterceptor', function ($window, $q, webStoragesService, authenticationService) {
      return {
        request: function(config) {
          config.headers = config.headers || {};
          if (webStoragesService.getItemFromStorages('access_token')) {
            config.headers.Authorization = 'Bearer ' + webStoragesService.getItemFromStorages('access_token');
          }
          return config || $q.when(config);
        },
        response: function(response) {
          if (response.status === 401) {
            webStoragesService.clearWebStorages();
            authenticationService.isLoggedIn = false;
            $window.location.href = '/login';
          }
          //TODO Redirect internal server error
          //TODO Redirect not found
          return response || $q.when(response);
        }
      };
    })

})();
