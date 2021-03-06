(function () {
  'use strict';

  angular
    .module('socialbook')
    .config(routesConfig);

  /** @ngInject */
  function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('public', {
        abstract: true,
        controller: 'PublicController',
        controllerAs: 'public',
        templateUrl: 'app/public/public.html',
        resolve: {
          isAuthenticated: function (authenticationService, $location) {
            if (authenticationService.isLoggedIn) {
              $location.path('/dashboard');
              // $window.location.href = '/dashboard';
            }
          }
        }
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
      .state('public.forgot-password', {
        url: '/forgot-password',
        // controller: 'ForgotPassController',
        // controllerAs: 'forgot-pass',
        templateUrl: 'app/public/forgot-password/forgot-password.html'
      })


      .state('private', {
        abstract: true,
        controller: 'PrivateController',
        controllerAs: 'private',
        templateUrl: 'app/private/private.html',
        resolve: {
          isAuthenticated: function (authenticationService, $location) {
            if (!authenticationService.isLoggedIn) {
              $location.path('/login');
              // $window.location.href = '/login';
            }
          }
        }
      })

      .state('private.dashboard', {
        url: '/dashboard',
        params: {
          username: null
        },
        controller: 'DashboardController',
        controllerAs: 'dashboard',
        templateUrl: 'app/private/dashboard/dashboard.html'
      })
      .state('private.profile', {
        url: '/user/:username',
        controller: 'ProfileController',
        controllerAs: 'profile',
        templateUrl: 'app/private/profile/profile.html',
        resolve: {
          checkParam: function ($stateParams, $location) {
            //Check if url parameter is missing.
            if ($stateParams.username == "") {
              $location.path('/dashboard');
            }
          }
        }
      })
      .state('private.editProfile', {
        url: '/settings/edit-profile',
        controller: 'SettingsController',
        controllerAs: 'settings',
        templateUrl: 'app/private/settings/edit-profile.html'
      })
      .state('private.changePass', {
        url: '/settings/change-password',
        controller: 'SettingsController',
        controllerAs: 'settings',
        templateUrl: 'app/private/settings/change-password.html'
      });

  }

})();
