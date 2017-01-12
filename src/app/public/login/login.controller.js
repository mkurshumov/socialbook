(function () {
  'use strict';

  angular
    .module('socialbook')
    .controller('LoginController', function (authenticationService, $location, $window) {
      var vm = this;

      vm.mockedCredentials = {
        username: 'qweqwe',
        password: 'qweqwe'
      };

      vm.credentials = {
        username: vm.username,
        password: vm.password,
        remember: vm.remember
      };

      vm.login = function () {
        console.log(vm.user);
        if (vm.mockedCredentials.username == vm.credentials.username
          && vm.mockedCredentials.password == vm.credentials.password) {

          if (vm.credentials.remember == true) {
            authenticationService.setLocalStorage(vm.credentials.username);
          } else {
            authenticationService.setSessionStorage(vm.credentials.username);
          }

          console.log('Successful login');

          $window.location.href = '/dashboard';
        } else {
          console.log('Wrong credentials');
        }
      }
    });

})();
