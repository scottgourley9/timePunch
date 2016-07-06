angular.module('timePunch').controller('helpCtrl', function($scope, $state, myService){
  $scope.helpTopicsHidden = false;
  $scope.helpBackButtonHidden = true;
  $scope.helpTimePunchHidden = true;
  $scope.helpScheduleHidden = true;
  $scope.helpMyTimeHidden = true;
  $scope.helpRequestsHidden = true;
  $scope.helpSettingsHidden = true;
  $scope.helpLogoutHidden = true;

  $scope.goBackToHelp = function(){
    $scope.helpTopicsHidden = false;
    $scope.helpBackButtonHidden = true;
    $scope.helpTimePunchHidden = true;
    $scope.helpScheduleHidden = true;
    $scope.helpMyTimeHidden = true;
    $scope.helpRequestsHidden = true;
    $scope.helpSettingsHidden = true;
    $scope.helpLogoutHidden = true;
  }
    $scope.helpTimePunch = function(){
      $scope.helpTopicsHidden = true;
      $scope.helpBackButtonHidden = false;
      $scope.helpTimePunchHidden = false;
      $scope.helpScheduleHidden = true;
      $scope.helpMyTimeHidden = true;
      $scope.helpRequestsHidden = true;
      $scope.helpSettingsHidden = true;
      $scope.helpLogoutHidden = true;
    }
    $scope.helpSchedule = function(){
      $scope.helpTopicsHidden = true;
      $scope.helpBackButtonHidden = false;
      $scope.helpTimePunchHidden = true;
      $scope.helpScheduleHidden = false;
      $scope.helpMyTimeHidden = true;
      $scope.helpRequestsHidden = true;
      $scope.helpSettingsHidden = true;
      $scope.helpLogoutHidden = true;
    }
    $scope.helpMyTime = function(){
      $scope.helpTopicsHidden = true;
      $scope.helpBackButtonHidden = false;
      $scope.helpTimePunchHidden = true;
      $scope.helpScheduleHidden = true;
      $scope.helpMyTimeHidden = false;
      $scope.helpRequestsHidden = true;
      $scope.helpSettingsHidden = true;
      $scope.helpLogoutHidden = true;
    }
    $scope.helpRequests = function(){
      $scope.helpTopicsHidden = true;
      $scope.helpBackButtonHidden = false;
      $scope.helpTimePunchHidden = true;
      $scope.helpScheduleHidden = true;
      $scope.helpMyTimeHidden = true;
      $scope.helpRequestsHidden = false;
      $scope.helpSettingsHidden = true;
      $scope.helpLogoutHidden = true;
    }
    $scope.helpSettings = function(){
      $scope.helpTopicsHidden = true;
      $scope.helpBackButtonHidden = false;
      $scope.helpTimePunchHidden = true;
      $scope.helpScheduleHidden = true;
      $scope.helpMyTimeHidden = true;
      $scope.helpRequestsHidden = true;
      $scope.helpSettingsHidden = false;
      $scope.helpLogoutHidden = true;
    }
    $scope.helpLogout = function(){
      $scope.helpTopicsHidden = true;
      $scope.helpBackButtonHidden = false;
      $scope.helpTimePunchHidden = true;
      $scope.helpScheduleHidden = true;
      $scope.helpMyTimeHidden = true;
      $scope.helpRequestsHidden = true;
      $scope.helpSettingsHidden = true;
      $scope.helpLogoutHidden = false;
    }



})
