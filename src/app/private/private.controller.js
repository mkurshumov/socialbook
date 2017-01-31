(function () {
  'use strict';

  angular
    .module('socialbook')
    .controller('PrivateController', function (CONSTANTS, authenticationService, $window, httpRequester, webStoragesService, $mdSidenav, $timeout, $q, $http, $mdDialog) {
      var vm = this,
        logoutEndpoint = CONSTANTS.BASE + CONSTANTS.LOGOUT,
        meEndpoint = CONSTANTS.BASE + CONSTANTS.ME,
        searchEndpoint = CONSTANTS.BASE + CONSTANTS.SEARCH,
        userPreviewEndpoint = CONSTANTS.BASE + CONSTANTS.USERS,
        friendReqsEndpoint = CONSTANTS.BASE + CONSTANTS.ME + CONSTANTS.REQUESTS,
        statusEndpoint = CONSTANTS.STATUS;

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
            webStoragesService.handleWebStorage('localStorage', res.data);
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

      function getFriendRequests() {
        httpRequester.get(friendReqsEndpoint)
          .then(function (res) {
            console.log(res.data);
            vm.friendRequests = res.data;
            return res.data;
          }, function (err) {
            console.log(err);
          });
      }
      getFriendRequests();

      vm.showFriendRequests = function (ev) {
        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'dialog',
          templateUrl: 'app/common/templates/_friend-requests.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          locals: {
            items: vm.friendRequests
          },
          clickOutsideToClose: true,
          fullscreen: true // Only for -xs, -sm breakpoints.
        });
      };

      function DialogController(locals, $mdDialog) {
        var dialog = this;

        dialog.items = locals.items;

        dialog.close = function () {
          dialog.items = getFriendRequests();
          //close side-navigation
          vm.toggleLeft();
          //close dialog
          $mdDialog.hide();
        };

        dialog.clickedControls = [];
        /**
         * @param reset - (bool)
         * true - reset clickedControls to default values
         * false - populate clickedControls
         */
        function handleClickedControls(reset) {
          if (reset) {
            for (var i = 0; i < dialog.items.length; i++) {
              dialog.clickedControls[i].accept = false;
              dialog.clickedControls[i].decline = false;
            }
          } else {
            for (var j = 0; j < dialog.items.length; j++) {
              dialog.clickedControls[j] = {
                accept: false,
                decline: false,
                approved: false,
                declined: false
              };
            }
          }
        }
        handleClickedControls(false);

        dialog.handleRequest = function (requestId, status, index) {
          //set which button is clicked based on status
          if (status == 'approved') {
            dialog.clickedControls[index].accept = true;
          } else {
            dialog.clickedControls[index].decline = true;
          }

          var url = friendReqsEndpoint + requestId + statusEndpoint + status;

          httpRequester.put(url)
            .then(function (res) {
              console.log(res.data);
              //set status for proper button visualization
              if (status == 'approved') {
                dialog.clickedControls[index].approved = true;
              } else {
                dialog.clickedControls[index].declined = true;
              }
              handleClickedControls(true);
            }, function (err) {
              console.log(err);
              handleClickedControls(true);
            });
        };

      }


    });

})();
