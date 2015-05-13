// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('fieldAgent', ['ionic', 'fieldAgent.controllers', 'fieldAgent.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})




    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider



            .state('login', {
                url: '/login',
                templateUrl: "templates/login.html",
                controller: 'LoginCtrl'
            })

            .state('home', {
                url: '/home',
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            })

            .state('signup', {
                url: '/signup',
                templateUrl: "templates/signup.html",
                controller: 'SignupCtrl'
            })

            .state('addhouse', {
                url: '/addhouse',
                templateUrl: "templates/addhouse.html",
                controller: 'AddHouseCtrl'

            })

            .state('propertydetail', {
                url: '/propertydetail',
                templateUrl: "templates/propertydetail.html"
                //controller: 'ProDetailCtrl'
            })

        $urlRouterProvider.otherwise('/login');

    });