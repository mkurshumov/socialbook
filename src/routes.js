(function(){
  'use strict';

  angular
    .module('socialbook')
    .config(routesConfig);

  /** @ngInject */
  function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('public', {
        abstract: true,
        controller: 'PublicController',
        controllerAs: 'public',
        templateUrl: 'app/public/public.html'
      })

        .state('public.login', {
          url: '/login',
          controller: 'LoginController',
          controllerAs: 'login',
          templateUrl: 'app/public/login/login.html'
        })
        .state('public.register', {
          url: '/register',
          controller: 'RegisterController',
          controllerAs: 'register',
          templateUrl: 'app/public/register/register.html'
        })

      .state('private', {
        abstract: true,
        controller: 'PrivateController',
        controllerAs: 'private',
        templateUrl: 'app/private/private.html'
      })

        .state('private.dashboard', {
          url: '/dashboard',
          controller: 'DashboardController',
          controllerAs: 'dashboard',
          templateUrl: 'app/private/dashboard/dashboard.html'
        });
  }

})();
