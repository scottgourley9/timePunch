angular.module('timePunch').controller('adminSettingsCtrl', function($ionicPopup, $timeout, $state, $scope, myService){
$scope.theAdminView = false;
$scope.profileOfAdmin = true;
$scope.hideDemButtons = false;
$scope.changePasswordPageHidden = true;
$scope.changeCompanyIdPageHidden = true;

  $scope.menu = function(){

    $state.go('admin');

  }
  $scope.back = function(){
    $scope.profileOfAdmin = true;
    $scope.theAdminView = false;
    $scope.hideDemButtons = false;
    $scope.changePasswordPageHidden = true;
    $scope.changeCompanyIdPageHidden = true;
  }
  $scope.showProfile = function(){
      $scope.hideDemButtons = true;
      $scope.currentAdmin = myService.currentAdmin;
      $scope.profileOfAdmin = false;
      $scope.theAdminView = true;
      if($scope.currentAdmin.noLocation){
        $scope.addressHidden = true;
        $scope.noneHidden = false;
      }
      else {
        $scope.addressHidden = false;
        $scope.noneHidden = true;
      }
  }
  $scope.changePasswordPage = function(){
    $scope.hideDemButtons = true;
    $scope.currentAdmin = myService.currentAdmin;
    $scope.changePasswordPageHidden = false;
    $scope.theAdminView = true;
  }
  $scope.changeCompanyIdPage = function(){
    $scope.hideDemButtons = true;
    $scope.currentAdmin = myService.currentAdmin;
    $scope.changeCompanyIdPageHidden = false;
    $scope.theAdminView = true;
  }
  $scope.changeCompanyId = function(newCompanyId){
    myService.changeCompanyId(newCompanyId, $scope.currentAdmin._id).then(function(res){
      if(res.data){
        var confirmPopup = $ionicPopup.alert({
       title: 'COMPANY ID CHANGED',
       template: '<center>You will now be LOGGED OUT</center><br><center> Please RE-LOGIN</center>'
     });
     confirmPopup.then(function(res) {
         $state.go('home');
         location.reload();
       })
     }
   })
  }
  $scope.changePassword = function(newPassword){
    myService.changePassword(newPassword, $scope.currentAdmin._id).then(function(res){
      if(res.data){
        var confirmPopup = $ionicPopup.alert({
       title: 'PASSWORD CHANGED',
       template: '<center>You will now be LOGGED OUT</center><br><center> Please LOG IN with your NEW password</center>'
     });
     confirmPopup.then(function(res) {
         $state.go('home');
         location.reload();
       })
     }
   })
    }


})
