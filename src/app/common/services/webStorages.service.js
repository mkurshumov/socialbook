(function(){
  'use strict';

  angular
    .module('socialbook')
    .factory('webStoragesService', webStoragesService);

    /** @ngInject */
    function webStoragesService($window){
      var webStoragesService = this;

      webStoragesService.setSessionStorage = function (key, value) {
        $window.sessionStorage.setItem(key, value);
      };
      webStoragesService.setLocalStorage = function (key, value) {
        $window.localStorage.setItem(key, value);
      };
      webStoragesService.getItemFromStorages = function (key) {
        if ($window.sessionStorage[key]) {
          return $window.sessionStorage[key];
        }
        if ($window.localStorage[key]) {
          return $window.localStorage[key];
        }
      };
      webStoragesService.clearWebStorages = function () {
        $window.localStorage.clear();
        $window.sessionStorage.clear();
      };

      return webStoragesService;
    }

})();
