(function () {
  'use strict';

  angular
    .module('socialbook')
    .controller('PrivateController', function (CONSTANTS, authenticationService, $window, httpRequester, webStoragesService, $timeout, $mdSidenav) {
      var vm = this,
        logoutEndpoint = CONSTANTS.BASE + CONSTANTS.LOGOUT,
        meEndpoint = CONSTANTS.BASE + CONSTANTS.ME;

      vm.isLogoutClicked = false;
      vm.logout = function () {
        vm.isLogoutClicked = true;
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
            webStoragesService.handleWebStorage('localStorage', res.data, false);
            vm.currentUsername = webStoragesService.getItemFromStorages('userName');
            vm.profileImageData = webStoragesService.getItemFromStorages('profileImageData');
          }, function (err) {
            if (err.status == 401) {
              vm.logout();
            }
          });
      };

      vm.getMe();

      vm.toggleLeft = buildToggler('left');
      function buildToggler(componentId) {
        return function () {
          $mdSidenav(componentId).toggle();
        }
      }

      if (webStoragesService.getItemFromStorages('muteNotifications')) {
        vm.muteNotifications = webStoragesService.getItemFromStorages('muteNotifications');
      } else {
        vm.muteNotifications = false;
      }

      vm.handleNotifications = function () {
        vm.muteNotifications = !vm.muteNotifications;
        webStoragesService.setLocalStorage('muteNotifications', vm.muteNotifications);
      };

    });

})();
