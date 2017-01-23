(function () {
  'use strict';

  angular
    .module('socialbook')
    .controller('SettingsController', function (CONSTANTS, httpRequester) {
      var vm = this,
        meEndpoint = CONSTANTS.BASE + CONSTANTS.ME;

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
      }
    });

})();
