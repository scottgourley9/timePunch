angular.module('timePunch').controller('setLocationCtrl', function($ionicPopup, $state, $scope, myService){
  $scope.submitAddress = function(address){
    myService.setAddress(address).then(function(response){
      if(response){
        myService.updateAdminAddress(address);
        $ionicPopup.alert({
         title: "Clock IN's Restricted to Address",
         template: '<center>Users can ONLY CLOCK IN when close to this Address</center>'
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
  $scope.noRestriction = function(){
    myService.noRestriction(true).then(function(response){
      if(response){
        $ionicPopup.alert({
         title: 'NO CLOCK IN RESTRICTION',
         template: '<center>All users can clock in from ANYWHERE</center>'
       });

       $state.go('admin');
      }

    })
  }


})
