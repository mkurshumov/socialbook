(function(){
  'use strict';

  angular
    .module('socialbook')
    .controller('RegisterController', function (CONSTANTS, httpRequester, webStoragesService) {
      var vm = this,
        registerEndpoint = CONSTANTS.BASE + CONSTANTS.REGISTER;

      vm.newUser = {
        name: vm.name,
        username: vm.username,
        email: vm.email,
        password: vm.password,
        confirmPassword: vm.confirmPassword,
        gender: 0
      };

      vm.isRegClicked = false;
      vm.register = function () {
        vm.isRegClicked = true;

        if (vm.newUser.password == vm.newUser.confirmPassword) {
          httpRequester.post(registerEndpoint, vm.newUser)
            .then(function (res) {
              webStoragesService.handleWebStorage('localStorage', res.data, true, 'dashboard');
              vm.isRegClicked = false;
            }, function (err) {
              console.log(err);
              vm.isRegClicked = false;
            });
        } else {
          console.log('Passwords doesn\'t match!');
        }
      }

    });

})();
