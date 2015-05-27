angular.module('greendoor.services', [])

    .factory('ItemService', function($q, $http) {



         var items = [
          {id: 1, "itemName": "Coors", "type": "Beer", "subtype": "lager", "pakSize": 6, "price": 4.99, "fluidOnces": 12, src:"http://placehold.it/100x100", cartQuantity : 1},
          {id: 2, "itemName": "Heineken", "type": "Beer", "subtype": "lager", "pakSize": 6, "price": 8.99, "fluidOnces": 12, src:"http://placehold.it/100x100", cartQuantity : 1},
          {id: 3, "itemName": "Corona", "type": "Beer", "subtype": "pilsner", "pakSize": 6, "price": 5.99, "fluidOnces": 12, src:"http://placehold.it/100x100", cartQuantity : 1},
          {id: 4, "itemName": "Merlot", "type": "Wine", "subtype": "Red Wine", "pakSize": 1, "price": 14.99, "fluidOnces": 24, src:"http://placehold.it/100x100", cartQuantity : 1},
          {id: 5, "itemName": "Sky", "type": "Spirit", "subtype": "Vodka", "pakSize": 1, "price": 12.99, "fluidOnces": 24, src:"http://placehold.it/100x100", cartQuantity : 1},
          {id: 6, "itemName": "Bailey's", "type": "Spirit", "subtype": "other", "pakSize": 1, "price": 14.99, "fluidOnces": 24, src:"http://placehold.it/100x100",cartQuantity : 1},
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
            }

        }

    })

    .service('CartService',function(){
      var cart = [
        {"id": 1, "itemName": "Coors", "type": "Beer", "subtype": "lager", "pakSize": 6, "price": 4.99, "fluidOnces": 12, src:"http://placehold.it/100x100", "cartQuantity" : 1}
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
          if (cart[i].id == item.id)
          {
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

      this.decrementCart = function()
      {
        for (i in cart)
        {
          if (cart[i].id == item.id)
          {
            if (cart[i].cartQuantity >= 2)
            {
              cart[i] -=1;
            }
            else
            {
              cart.splice(i,1);
            }
          }
        }
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
    ;
