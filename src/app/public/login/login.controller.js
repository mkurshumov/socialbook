(function(){
  'use strict';

  angular
    .module('socialbook')
    .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController(){
      var vm = this;

      vm.tashak = 'tashak';
    }

})();
