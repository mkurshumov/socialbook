(function () {
  'use strict';

  angular
    .module('socialbook')
    .controller('PrivateController', function (CONSTANTS, authenticationService, $window, httpRequester, webStoragesService, $mdSidenav, $timeout, $q, $http) {
      var vm = this,
        logoutEndpoint = CONSTANTS.BASE + CONSTANTS.LOGOUT,
        meEndpoint = CONSTANTS.BASE + CONSTANTS.ME,
        searchEndpoint = CONSTANTS.BASE + CONSTANTS.SEARCH,
        userPreviewEndpoint = CONSTANTS.BASE + CONSTANTS.USERS;

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

      vm.dataLoaded = false;
      vm.getMe = function () {
        httpRequester.get(meEndpoint)
          .then(function (res) {
            console.log(res.data);
            webStoragesService.handleWebStorage('localStorage', res.data, false);
            vm.currentUsername = webStoragesService.getItemFromStorages('userName');
            vm.profileImageData = webStoragesService.getItemFromStorages('profileImageData');
            vm.dataLoaded = true;
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

      vm.searchTerm = '';
      vm.results = [];
      //md-autocomplete wants promise
      vm.search = function (searchTerm) {
        return $http.get(searchEndpoint + searchTerm)
          .then(function (response) {
            if (typeof response.data === typeof(vm.results)) {
              return response.data;
            } else {
              // invalid response
              return $q.reject(response.data);
            }
          }, function (response) {
            // something went wrong
            return $q.reject(response.data);
          });
      };

      var timer;

      vm.previewLoaded = false;
      vm.getUserPreview = function (username) {
        vm.previewLoaded = false;

        //timeout to avoid sending requests on every hover
        //send request if the user hovers 1 second
        timer = $timeout(function () {
          httpRequester.get(userPreviewEndpoint + username + CONSTANTS.PREVIEW)
            .then(function (res) {
              console.log(res.data);
              vm.previewData = res.data;
              if (res.data.gender == 1) {
                vm.previewData.gender = 'Female';
              } else if (res.data.gender == 2) {
                vm.previewData.gender = 'Male';
              } else {
                vm.previewData.gender = 'Other';
              }
              vm.previewLoaded = true;
            }, function (err) {

            });
        }, 1000);
      };
      vm.cancelTimer = function () {
        $timeout.cancel(timer);
      };

    });

})();
