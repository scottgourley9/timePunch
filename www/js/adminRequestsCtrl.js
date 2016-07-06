angular.module('timePunch').controller('adminRequestsCtrl', function($ionicPopup, $state, $scope, myService){
$scope.requestListButtons = true;
  $scope.getUserRequestsForAdmin = function(){
    myService.getUserRequestsForAdmin($scope.employeeSelected).then(function(response){
      $scope.userRequests = response.data;
    })
  }
  $scope.getUserRequestsForAdmin();

  $scope.flag = false;
  $scope.selected = -1;
  $scope.select = function(index){
    if(!$scope.flag){
    $scope.selected = index;
    $scope.flag = true;
  }
  else {
    $scope.selected = -1;
    $scope.flag = false;
  }

  }



  $scope.deleteIt = function(index){
    if($scope.userRequests[index].status === "Pending"){
      $ionicPopup.alert({
       title: 'Can NOT Delete Pending Request',
       template: '<center>You MUST Approve or Deny before you can Delete<center>'
     });
    }
    else {
    myService.removeRequestFromUserAdmin($scope.userRequests[index]._id, $scope.employeeSelected).then(function(res){
      if(res.data){
        $ionicPopup.alert({
         title: 'Request Deleted'
       });
       $scope.flag = false;
       $scope.selected = -1;
       $scope.getUserRequestsForAdmin();
      }
      else {
        $ionicPopup.alert({
         title: 'Error'
       });
      }
    })
  }
  }


  $scope.denyIt = function(index){
    myService.denyRequest($scope.userRequests[index]._id).then(function(response){
      if(response.data){
        $ionicPopup.alert({
         title: 'Request Denied'
       });
       $scope.flag = false;
       $scope.selected = -1;
       $scope.getUserRequestsForAdmin();
      }
      else {
        $ionicPopup.alert({
         title: 'Error'
       });
    }
  })
  }
  $scope.approveIt = function(index){
    myService.approveRequest($scope.userRequests[index]._id).then(function(response){
      if(response.data){
        $ionicPopup.alert({
         title: 'Request Approved'
       });
       $scope.flag = false;
       $scope.selected = -1;
       $scope.getUserRequestsForAdmin();
      }
      else {
        $ionicPopup.alert({
         title: 'Error'
       });
    }
  })
  }


  $scope.back = function(){
    myService.employeeSectionShowing = false;
    myService.backButtonsAndLogoutButtonSectionHidden = false;
    $state.go('employees');
  }



})
