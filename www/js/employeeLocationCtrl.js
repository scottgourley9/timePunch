angular.module('timePunch').controller('employeeLocationCtrl', function($interval, $scope, $state, myService){

  $scope.getUserLocations = function(){
    $scope.employeeSelected = myService.theEmployeeSelected._id;
    myService.getUserLocations(myService.theEmployeeSelected._id).then(function(locationResponse){
      $scope.userLocations = locationResponse.data;
    })
    }
    $scope.getUserLocations();

    var adminInterval = $interval(function(){
      $scope.getUserLocations();
    }, 60000);

    $scope.backLocationButton = function(){
      $interval.cancel(adminInterval);
      adminInterval = undefined;
      $state.go('employees');
    }



})
