angular.module('timePunch').controller('setLocationCtrl', function($ionicPopup, $state, $scope, myService){
  $scope.submitAddress = function(address){
    myService.setAddress(address).then(function(response){
      if(response){
        $ionicPopup.alert({
         title: 'Clock Ins Restricted to Address',
         template: '<center>You can see current address in your profile</center>'
       });
       $scope.currentSetLocation = address;
       myService.setLocation(response.data.results[0].geometry.location);
       $state.go('admin');
      }

    })
  }
  $scope.goBackToAdmin = function(){
    $state.go('admin');
  }
})
