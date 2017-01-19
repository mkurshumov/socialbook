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

      vm.isLoginClicked = false;
      vm.login = function () {
        vm.isLoginClicked = true;

        var data = {
          username: vm.credentials.username,
          password: vm.credentials.password
        };
        var rememberMe = vm.credentials.remember;

        httpRequester.post(loginEndpoint, data)
          .then(function (res) {
            processLogin(rememberMe, res.data);
            vm.isLoginClicked = false;
          }, function (err) {
            console.log(err);
            vm.isLoginClicked = false;
          });
      };

      function processLogin(rememberMe, data) {
        if (rememberMe) {
          webStoragesService.handleWebStorage('localStorage', data);
        } else {
          webStoragesService.handleWebStorage('sessionStorage', data);
        }
      }
    });

})();
