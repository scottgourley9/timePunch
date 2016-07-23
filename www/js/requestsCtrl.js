angular.module('timePunch').controller('requestsCtrl', function($ionicPopup, $scope, myService, $state){



$scope.requestListButtons = true;
  $scope.getAllRequests = function(){
    myService.getAllRequests().then(function(response){
      $scope.userRequests = [];
      for (var i = 0; i < response.data.length; i++){
        if(response.data[i].status === "Pending"){
          $scope.userRequests.push(response.data[i])
        }
      }


    })
  }
  $scope.getAllRequests();

  $scope.flag = false;
  $scope.selected = -1;
  $scope.select = function(index){
    if(!$scope.flag){
    $scope.selected = index;
    $scope.flag = true;
    $scope.employeeSelected = $scope.userRequests[index].user;
  }
  else {
    $scope.selected = -1;
    $scope.flag = false;
  }

  }





  $scope.back = function(){
    $state.go('admin');
  }





  $scope.denyIt = function(index){
    if($scope.userRequests[index].status === "APPROVED"){
      $ionicPopup.alert({
       title: 'Can NOT Deny already Approved Request',
       template: '<center>You MUST change manually<center>'
     });
    }
    else {
    myService.denyRequest($scope.userRequests[index]._id).then(function(response){
      if(response.data){
        $ionicPopup.alert({
         title: 'Request Denied'
       });
       $scope.flag = false;
       $scope.selected = -1;
       $scope.getAllRequests();
      }
      else {
        $ionicPopup.alert({
         title: 'Error'
       });
    }
  })
  }
  }
  $scope.approveIt = function(index){


    if($scope.userRequests[index].requestType === "Fix Time"){
    var theDay = (new Date($scope.userRequests[index].date)).toDateString();
    var modifiedForTime = [{
      day: theDay,
      timeStamp: $scope.userRequests[index].timeIn,
      inOrOut: "IN"
    },
    {
      day: theDay,
      timeStamp: $scope.userRequests[index].timeOut,
      inOrOut: "OUT"
    }]
    myService.clearTime(modifiedForTime[0]).then(function(deleteRes){
      myService.changeTime(modifiedForTime[0]).then(function(response){
        myService.postTimeStampToUserApprove(response, $scope.employeeSelected);
        myService.changeTime(modifiedForTime[1]).then(function(nextResponse){
          myService.postTimeStampToUserApprove(nextResponse, $scope.employeeSelected);

        if(nextResponse){
          myService.approveRequest($scope.userRequests[index]._id).then(function(res){
            if(res.data){
              $ionicPopup.alert({
               title: 'Request Approved'
             });
             $scope.flag = false;
             $scope.selected = -1;
             $scope.getAllRequests();
            }
            else {
              $ionicPopup.alert({
               title: 'Error'
             });
          }
        })
        }
        else {
          $ionicPopup.alert({
           title: 'Error'
         });
      }
  })
    })
    })
  }
  else {
  var theShift = {
    day: $scope.userRequests[index].date,
    start: "OFF",
    user: $scope.employeeSelected._id
  }
  myService.submitShift(theShift).then(function(aResponse){

    if(aResponse.data){
      myService.approveRequest($scope.userRequests[index]._id);
      $ionicPopup.alert({
       title: 'Request Approved'
     });
     $scope.flag = false;
     $scope.selected = -1;
     $scope.getAllRequests();
    }
    else {
      $ionicPopup.alert({
       title: 'Error'
     });
  }
  })

  }

  }






})
