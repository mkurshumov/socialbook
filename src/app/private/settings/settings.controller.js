(function () {
  'use strict';

  angular
    .module('socialbook')
    .controller('SettingsController', function (CONSTANTS, httpRequester, $location) {
      var vm = this,
        meEndpoint = CONSTANTS.BASE + CONSTANTS.ME,
        changePassEndpoint = CONSTANTS.BASE + CONSTANTS.ME + CONSTANTS.CHANGE_PASS;

      vm.dataLoaded = false;

      vm.getMe = function () {
        httpRequester.get(meEndpoint)
          .then(function (res) {
            vm.currentUser = res.data;
            vm.dataLoaded = true;
          }, function (err) {
            console.log(err);
          });
      };
      vm.getMe();

      vm.editBtnClicked = false;
      vm.editProfile = function () {
        vm.editBtnClicked = true;

        httpRequester.put(meEndpoint, vm.currentUser)
          .then(function (res) {
            console.log(res);
            vm.getMe();
            vm.editBtnClicked = false;
          }, function (err) {
            console.log(err);
          });
      };

      vm.changePasswordData = {};
      vm.changePassBtnClicked = false;
      vm.changePassword = function () {
        vm.changePassBtnClicked = true;

        httpRequester.put(changePassEndpoint, vm.changePasswordData)
          .then(function (res) {
            console.log(res);
            vm.changePasswordData = {};
            vm.changePassBtnClicked = false;
            $location.path('/dashboard');
          }, function (err) {
            console.log(err);
          });
      }
    });

})();
