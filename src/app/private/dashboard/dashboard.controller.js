(function(){
  'use strict';

  angular
    .module('socialbook')
    .controller('DashboardController', function (authenticationService, $location, $window) {
      var vm = this;

      vm.logout = function () {
        authenticationService.clearWebStorages();
        $window.location.href = '/login';
      }
    });

})();
