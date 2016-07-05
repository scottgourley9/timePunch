angular.module('timePunch').controller('forgotCtrl', function($state, $scope, myService){
  $scope.back = function(){
    $state.go('home');
    location.reload();
  }
  $scope.submit = function(){
    $state.go('home');
    location.reload();
  }
})
