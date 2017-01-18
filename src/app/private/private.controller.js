(function(){
  'use strict';

  angular
    .module('socialbook')
    .controller('PrivateController', function (CONSTANTS, authenticationService, $window, httpRequester, webStoragesService) {
      var vm = this,
        logoutEndpoint = CONSTANTS.BASE + CONSTANTS.LOGOUT,
        meEndpoint = CONSTANTS.BASE + CONSTANTS.ME;

      vm.currentUser = webStoragesService.getItemFromStorages('userName');

      vm.logout = function () {
        httpRequester.post(logoutEndpoint, {})
          .then(function (res) {
            webStoragesService.clearWebStorages();
            $window.location.href = '/login';
          }, function (err) {
            if (err.status == 401) {
              webStoragesService.clearWebStorages();
              $window.location.href = '/login';
            }
            //TODO
            if (err.status == 400) {
              console.log('Not Found');
            }
            if (err.status == 500) {
              console.log('Internal Server Error');
            }

          });
      };
      vm.getMe = function () {
        httpRequester.get(meEndpoint)
          .then(function (res) {
            console.log(res);
          }, function (err) {
            console.log(err);
          });
      }
    });

})();
