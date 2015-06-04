angular.module('greendoor.controllers', ['greendoor.services'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

/*
.controller('StoreCtrl', function ($scope, ItemService, $http, CartService) {

    $scope.searchKey = "";
    $scope.items = ItemService.items;
    $scope.cart = CartService.listCart();


    $http.get('api/items.json')
       .then(function(res){
         //console.log(res.data);
          $scope.drinks = res.data;
        });

    //cart functions

    $scope.clearSearch = function () {
        console.log("cleared");
        $scope.searchKey = "";
        findAllItems();
    }

    $scope.search = function () {

        ItemService.findByName($scope.searchKey).then(function (items) {
            $scope.items = items;
        });
    }

    var findAllItems = function() {
        ItemService.findAll().then(function (items) {
            $scope.items = items;
        });
    }

    findAllItems();

})*/

.controller('StoreCtrl', function ($scope,$stateParams, ItemService, $http, CartService, StoreService) {

    $scope.searchKey = "";
    //$scope.items = ItemService.items;


    StoreService.findByStoreId($stateParams.id_store).then(function(stores) {
      $scope.storeName = stores[0].storeName;
      console.log($scope.storeName);
    });

    /*
    $http.get('api/items.json')
       .then(function(res){
         //console.log(res.data);
          $scope.drinks = res.data;
        });
        */
    //cart functions

    $scope.clearSearch = function () {
        console.log("cleared");
        $scope.searchKey = "";
        findAllItems();
    }

    $scope.search = function () {

        ItemService.findByName($scope.searchKey).then(function (items) {
            $scope.items = items;
        });
    }

    var findAllItems = function() {
        ItemService.findAll().then(function (items) {
            $scope.items = items;
        });
    }



    ItemService.findByStoreId($stateParams.id_store).then(function(items) {
            $scope.items = items;

    });



})

.controller('CartCtrl', function($scope, $stateParams, CartService) {
  $scope.cart = CartService.listCart();

  $scope.listCart = function()
  {
    console.log($scope.cart);
  }
  $scope.addToCart = function(item)
  {
    console.log("+");
    CartService.addToCart(item)
  }
  $scope.decrementCart = function(item)
  {
    console.log("-");
    CartService.decrementCart(item)
  }
  $scope.hi = function()
  {
    console.log("hi");
  }

})
/*
.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
  function initialize() {

    var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }
  google.maps.event.addDomListener(window, 'load', initialize);

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };

})
*/
.controller('MapCtrl', function($scope, $ionicLoading, $compile, StoreService) {

  //store's list functions
  var findAllStores = function() {
      StoreService.findAll().then(function (stores) {
          $scope.stores = stores;
      });
  }



  function initialize() {
    var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    //Marker + infowindow + angularjs compiled ng-click
    var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    var compiled = $compile(contentString)($scope);

    var infowindow = new google.maps.InfoWindow({
      content: compiled[0]
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
    //console.log($scope.stores);


  }
  ionic.Platform.ready(initialize);

  $scope.centerOnMe = function() {
    if(!$scope.map) {
      return;
    }

    $scope.loading = $ionicLoading.show({
      content: 'Getting current location...',
      showBackdrop: false
    });

    navigator.geolocation.getCurrentPosition(function(pos) {
      $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      $scope.loading.hide();
    }, function(error) {
      alert('Unable to get location: ' + error.message);
    });
  };

  $scope.clickTest = function() {
    alert('Example of infowindow with ng-click')
  };

  findAllStores();


})

.controller('ItemIndexCtrl', function ($scope, ItemService, $http, CartService) {

    $scope.searchKey = "";
    $scope.items = ItemService.items;
    $scope.cart = CartService.listCart();

    /*
    $http.get('api/items.json')
       .then(function(res){
         //console.log(res.data);
          $scope.drinks = res.data;
        });
        */
    //cart functions

    $scope.clearSearch = function () {
        console.log("cleared");
        $scope.searchKey = "";
        findAllItems();
    }

    $scope.search = function () {

        ItemService.findByName($scope.searchKey).then(function (items) {
            $scope.items = items;
        });
    }

    var findAllItems = function() {
        ItemService.findAll().then(function (items) {
            $scope.items = items;
        });
    }

    findAllItems();

})

;
