angular.module('timePunch').controller('exisitingRequestsCtrl', function($ionicPopup, $scope, myService, $state){
  $scope.requestListButtons = true;
  $scope.getRequests = function(){
    myService.getRequests().then(function(response){
      $scope.requests = response.data;
    })
  };
  $scope.getRequests();
  $scope.goBackOne = function(){
    $state.go('fixTime')

  }
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

  $scope.removeIt = function(index){
    myService.removeRequestFromUser($scope.requests[index]._id).then(function(res){
      if(res.data){
        $ionicPopup.alert({
         title: 'Request Deleted'
       });
       $scope.flag = false;
       $scope.selected = -1;
       $scope.getRequests();
      }
      else {
        $ionicPopup.alert({
         title: 'Error'
       });
      }
    })
  }







  $scope.mainPageButtons = false;
  $scope.newRequestTypeButtons = true;
  $scope.fixTimeSection = true;
  $scope.timeOffSection = true;
  $scope.entireFixHtmlHidden = false;

  $scope.showEdit = function(index){
    if($scope.requests[index].status !== "Pending"){
      $ionicPopup.alert({
       title: 'Status is NOT PENDING',
       template: '<center>To EDIT Status must be PENDING</center>'
     });
    }
    else {
      $scope.mainPageButtons = true;
      $scope.newRequestTypeButtons = false;
      $scope.theIndexSelected = index;
    }

  }
  $scope.showExisting = function(){

    $state.go('exisitingRequests');
  }

  $scope.backSelectedSection = function(){
    $scope.mainPageButtons = false;
    $scope.newRequestTypeButtons = true;
  }
  $scope.showSelectedSection = function(selection){
    if(selection === 'Fix Time'){
      $scope.fixTimeSection = false;
      $scope.mainPageButtons = true;
      $scope.newRequestTypeButtons = true;
      $scope.timeOffSection = true;
    }
    else if(selection === 'Time Off'){
      $scope.fixTimeSection = true;
      $scope.mainPageButtons = true;
      $scope.newRequestTypeButtons = true;
      $scope.timeOffSection = false;
    }
    else {
      $ionicPopup.alert({
       title: 'Nothing Selected!',
       template: '<center>Please Select an Option</center>'
     });
    }
  }
  $scope.backRequest = function(){
    $scope.fixTimeSection = true;
    $scope.timeOffSection = true;
    $scope.mainPageButtons = true;
    $scope.newRequestTypeButtons = false;
    $scope.timeOffSection = true;
  }
  $scope.editRequest = function(theRequest){

    $scope.flag = false;
    $scope.selected = -1;
    myService.editRequestFromUser($scope.requests[$scope.theIndexSelected]._id, theRequest).then(function(response){
      if(response.data){

        $scope.getRequests();
        $scope.mainPageButtons = false;
        $scope.newRequestTypeButtons = true;
        $scope.fixTimeSection = true;
        $scope.timeOffSection = true;
        $scope.request = "";
        $ionicPopup.alert({
         title: 'Request Edited',
         template: '<center>Admin to approve</center>'
       });
      }
      else{
        $ionicPopup.alert({
          title: 'Request Error'

        })
      }
    })
  }








})
