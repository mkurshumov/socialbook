(function(){
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
        if (!webStoragesService.getItemFromStorages('profileImageData')) {
          httpRequester.get(meEndpoint)
            .then(function (res) {
              webStoragesService.handleWebStorage('localStorage', res.data, false);
              vm.currentUser = res.data;
            }, function (err) {
              if (err.status == 401) {
                vm.logout();
              }
            });
        } else {
          vm.currentUser = {
            coverImageData: webStoragesService.getItemFromStorages('coverImageData'),
            email: webStoragesService.getItemFromStorages('gender'),
            id: webStoragesService.getItemFromStorages('id'),
            name: webStoragesService.getItemFromStorages('name'),
            profileImageData: webStoragesService.getItemFromStorages('profileImageData'),
            username: webStoragesService.getItemFromStorages('username')
          }
        }
      };

      vm.getMe();

      vm.toggleLeft = buildToggler('left');
      function buildToggler(componentId) {
        return function() {
          $mdSidenav(componentId).toggle();
        }
      }

    });

})();
