angular.module('greendoor.services', [])

    .factory('ItemService', function($q, $http) {

         var items = [
          {id_item: 1, id_store: 1, "itemName": "Coors", "type": "Beer", "subtype": "lager", "pakSize": 6, "price": 4.99, "fluidOnces": 12, src:"http://placehold.it/100x100", cartQuantity : 1},
          {id_item: 2, id_store: 1,"itemName": "Heineken", "type": "Beer", "subtype": "lager", "pakSize": 6, "price": 8.99, "fluidOnces": 12, src:"http://placehold.it/100x100", cartQuantity : 1},
          {id_item: 3, id_store: 1,"itemName": "Corona", "type": "Beer", "subtype": "pilsner", "pakSize": 6, "price": 5.99, "fluidOnces": 12, src:"http://placehold.it/100x100", cartQuantity : 1},
          {id_item: 4, id_store: 2,"itemName": "Merlot", "type": "Wine", "subtype": "Red Wine", "pakSize": 1, "price": 14.99, "fluidOnces": 24, src:"http://placehold.it/100x100", cartQuantity : 1},
          {id_item: 5, id_store: 2,"itemName": "Sky", "type": "Spirit", "subtype": "Vodka", "pakSize": 1, "price": 12.99, "fluidOnces": 24, src:"http://placehold.it/100x100", cartQuantity : 1},
          {id_item: 6, id_store: 3,"itemName": "Bailey's", "type": "Spirit", "subtype": "other", "pakSize": 1, "price": 14.99, "fluidOnces": 24, src:"http://placehold.it/100x100",cartQuantity : 1},
        ];

        // We use promises to make this api asynchronous. This is clearly not necessary when using in-memory data
        // but it makes this service more flexible and plug-and-play. For example, you can now easily replace this
        // service with a JSON service that gets its data from a remote server without having to changes anything
        // in the modules invoking the data service since the api is already async.

        return {
            findAll: function() {
                var deferred = $q.defer();
                deferred.resolve(items);
                return deferred.promise;
            },

            findById: function(itemId) {
                var deferred = $q.defer();
                var item = items[itemId - 1];
                deferred.resolve(item);
                return deferred.promise;
            },

            findByName: function(searchKey) {
                var deferred = $q.defer();
                var results = items.filter(function(element) {
                    var fullName = element.itemName;
                    return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
                });
                deferred.resolve(results);
                return deferred.promise;
            },

            findByManager: function (managerId) {
                var deferred = $q.defer(),
                    results = items.filter(function (element) {
                        return parseInt(managerId) === element.managerId;
                    });
                deferred.resolve(results);
                return deferred.promise;
            },
            findByStoreId: function(id_store) {
              var deferred = $q.defer(),
                  results = items.filter(function (element) {
                      return parseInt(id_store) === element.id_store;
                  });
              deferred.resolve(results);
              return deferred.promise;
            },

        }

    })

    .service('CartService',function(){
      var cart = [
        {id_item: 1, id_store: 1, "itemName": "Coors", "type": "Beer", "subtype": "lager", "pakSize": 6, "price": 4.99, "fluidOnces": 12, src:"http://placehold.it/100x100", cartQuantity : 1},
      ];

      this.get = function(id)
      {
        for (i in cart)
        {
          if (cart[i].id ==id)
          {
            return cart[i];
          }
        }
      }

      this.listCart = function ()
      {
        return cart;
      }

      this.addToCart = function(item)
      {
        console.log("services.js:addToCart()");
        var existsInCart = false;
        for (i in cart)
        {
          if (cart[i].id_item == item.id_item)
          {
            console.log("item in cart:adding");
            cart[i].cartQuantity +=1;
            existsInCart = true;
          }
        }
        if (!existsInCart)
        {
          console.log("services.js:no such item in cart");
          cart.push(item)
        }
      }

      this.decrementCart = function(item)
      {
        console.log("decrementing Cart..");
        for (i in cart)
        {
          if (cart[i].id_item == item.id_item)
          {
            if (cart[i].cartQuantity >= 2)
            {
              console.log("in cart! decrementing");

              cart[i].cartQuantity -=1;
            }
            else
            {
              console.log("only one! removing...");

              cart.splice(i,1);
            }
          }
        }
      }
      this.hi = function()
      {
        console.log("Hi");
      }


      this.removeFromCart = function()
      {
        for (i in cart)
        {
          if (cart[i].id == item.id)
          {
              cart.splice(i,1);
          }
        }
      }

    })

    .service('UserService',function(){
      var users = [
        {id_user: 1, "firstName": "Wesley", "lastName": "Snipes", "email": "wesley@gmail.com", "phone": "666-6666"},
        {id_user: 2, "firstName": "Vin", "lastName": "Diesel", "email": "diesel@gmail.com", "phone": "666-6666"},
        {id_user: 3, "firstName": "Arnold", "lastName": "Schwartzenegger", "email": "arnold@gmail.com", "phone": "666-6666"},
      ];
    })

    .factory('StoreService',function($q,$http){
      var stores = [
        {id_store: 1, "storeName": "Curly's Liquor", "address": "123 fake street","city": "123 fake street", "state": "CA", "zip": "94132", "latitude": 37.7855500, "longitude":-122.3967180, "phone": "666-6666", "email": "curly@booze.com"},
        {id_store: 2, "storeName": "Larry's Liquor", "address": "123 fake street","city": "123 fake street", "state": "CA", "zip": "94132", "latitude": 37.7820450, "longitude":-122.4011890, "phone": "666-6666", "email": "larry@booze.com"},
        {id_store: 3, "storeName": "Moe's Liquor", "address": "123 fake street","city": "123 fake street", "state": "CA", "zip": "94132", "latitude":37.7802840, "longitude":-122.4034160, "phone": "666-6666", "email": "moe@booze.com"}
      ];
      return {
          findAll: function() {
              var deferred = $q.defer();
              deferred.resolve(stores);
              return deferred.promise;
          },
          findByStoreId: function(id_store) {
            var deferred = $q.defer(),
                results = stores.filter(function (element) {
                    return parseInt(id_store) === element.id_store;
                });
            deferred.resolve(results);
            return deferred.promise;
          }
        }
    })

    ;
