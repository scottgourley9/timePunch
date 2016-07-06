angular.module('timePunch').controller('settingsCtrl', function($ionicPopup, $scope, $state, myService){
  $scope.theSettingsView = false;
  $scope.profileOfAdmin = true;
  $scope.settingsBackButton = true;
  $scope.changePasswordPageHidden = true;
  $scope.changeCompanyIdPageHidden = true;

    $scope.menu = function(){

      $state.go('admin');

    }
    $scope.back = function(){
      $scope.profileOfAdmin = true;
      $scope.theSettingsView = false;

      $scope.changePasswordPageHidden = true;
      $scope.changeCompanyIdPageHidden = true;
    }
    $scope.showProfile = function(){

        $scope.currentUser = myService.currentUser;
        $scope.profileOfAdmin = false;
        $scope.theSettingsView = true;
        $scope.settingsBackButton = false;
    }
    $scope.changePasswordPage = function(){

      $scope.currentUser = myService.currentUser;
      $scope.changePasswordPageHidden = false;
      $scope.theSettingsView = true;
      $scope.settingsBackButton = false;
    }
    $scope.changeCompanyIdPage = function(){

      $scope.currentUser = myService.currentUser;
      $scope.changeCompanyIdPageHidden = false;
      $scope.theSettingsView = true;
      $scope.settingsBackButton = false;
    }
    $scope.changeCompanyId = function(newCompanyId){
      myService.changeCompanyIdUser(newCompanyId, $scope.currentUser._id).then(function(res){
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
      myService.changePasswordUser(newPassword, $scope.currentUser._id).then(function(res){
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
