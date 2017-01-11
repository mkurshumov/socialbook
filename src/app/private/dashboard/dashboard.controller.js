(function(){
  'use strict';

  angular
    .module('socialbook')
    .controller('DashboardController', DashboardController);

    /** @ngInject */
    function DashboardController(authenticationService, $location){
      var vm = this;

      vm.logout = function () {
        authenticationService.clearWebStorages();
        $location.path('/login');
      }
    }

})();
