(function () {
  'use strict';

  angular
    .module('socialbook')
    .controller('LoginController', function (authenticationService, $location, $window, httpRequester, CONSTANTS, webStoragesService) {
      var vm = this,
        loginEndpoint = CONSTANTS.BASE + CONSTANTS.LOGIN;

      vm.credentials = {
        username: vm.username,
        password: vm.password,
        remember: vm.remember || false
      };

      vm.login = function () {
        var data = {
          username: vm.credentials.username,
          password: vm.credentials.password
        };
        var rememberMe = vm.credentials.remember;

        httpRequester.post(loginEndpoint, data)
          .then(function (res) {
            console.log(res.data);
            processLogin(rememberMe, res.data);
          }, function (err) {
            console.log(err);
          });
      };

      function processLogin(rememberMe, data) {
        if (rememberMe) {
          handleWebStorage('webStorage', data);
        } else {
          handleWebStorage('sessionStorage', data);
        }
      }

      function handleWebStorage(webStorage, data) {
        if (webStorage == 'sessionStorage') {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              webStoragesService.setSessionStorage(key, data[key]);
            }
          }
        } else if (webStorage == 'localStorage') {
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              webStoragesService.setLocalStorage(key, data[key]);
            }
          }
        }
        $window.location.href = '/dashboard';
      }

    });

})();
