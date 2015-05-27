angular.module('greendoor.directives.itemCard', ['greendoor.services'])
.directive('itemCard', function()
{
  return{
    $scope: {
    },
    templateUrl:"templates/directives/itemCard.html",
    controller:function($scope, CartService){
      $scope.listCart = function()
      {
        console.log($scope.cart);
      }
      $scope.addToCart = function(item)
      {
        CartService.addToCart(item)
      }
    }
  }
});
