// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var greendoor = angular.module('greendoor', ['ionic', 'greendoor.controllers', 'greendoor.services', 'greendoor.directives.itemCard'])

greendoor.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

greendoor.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })

  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
  .state('app.map', {
    url: "/map",
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: 'MapCtrl'
      }
    }
  })
  .state('app.cart', {
    url: "/cart",
    views: {
      'menuContent': {
        templateUrl: "templates/cart.html",
        controller: 'CartCtrl'
      }
    }
  })
  .state('app.itemIndex', {
    url: "/itemIndex",
    views: {
      'menuContent': {
        templateUrl: "templates/itemIndex.html",
        controller: 'itemIndexCtrl'
        /*resolve:{
          drinks:['$http', function($http){
            return $http.get('/api/items.json').then(function(response){
              return response.data
            })
          }]
        }*/
      }
    }
  })
  .state('app.store', {
    url: '/store/:id_store',
    views:{
      'menuContent':{
        templateUrl: 'templates/store.html',
        controller: 'StoreCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/map');
});
