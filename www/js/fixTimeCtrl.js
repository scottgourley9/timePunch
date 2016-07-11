angular.module('timePunch').controller('fixTimeCtrl', function($ionicPopup, $scope, $state, myService){
  $scope.mainPageButtons = false;
  $scope.newRequestTypeButtons = true;
  $scope.fixTimeSection = true;
  $scope.timeOffSection = true;
  $scope.entireFixHtmlHidden = false;

  $scope.showNew = function(){
    $scope.mainPageButtons = true;
    $scope.newRequestTypeButtons = false;
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
  $scope.newRequest = function(theRequest){
    var d = new Date(theRequest.date);
    var hours = theRequest.timeIn.getHours();
    var minutes = theRequest.timeIn.getMinutes();
    var seconds = theRequest.timeIn.getSeconds();
    d.setHours(hours);
    d.setMinutes(minutes);
    d.setSeconds(seconds);
    theRequest.timeIn = d;
    var dd = new Date(theRequest.date);
    var outhours = theRequest.timeOut.getHours();
    var outminutes = theRequest.timeOut.getMinutes();
    var outseconds = theRequest.timeOut.getSeconds();
    dd.setHours(outhours);
    dd.setMinutes(outminutes);
    dd.setSeconds(outseconds);
    theRequest.timeOut = dd;
    myService.newRequest(theRequest).then(function(response){
      if(response){
        $scope.mainPageButtons = false;
        $scope.newRequestTypeButtons = true;
        $scope.fixTimeSection = true;
        $scope.timeOffSection = true;
        $scope.request = "";
        $ionicPopup.alert({
         title: 'Request Submitted',
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
