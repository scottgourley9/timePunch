angular.module('timePunch').controller('adminCtrl', function($ionicPopup, $timeout, $state, $scope, myService){

  // $scope.loadTheUpdatedAdmin = (function(){
  //   myService.loginAsAdmin(myService.currentAdmin).then(function(response){
  //     myService.currentAdmin = response.data;
  //   })
  // })();


  $scope.sClassHidden = true;
  $scope.sClass = [];
  $scope.sClass.splice(0);
    $timeout(function(){
      $scope.sClassHidden = false;
      $scope.sClass.push('animated flipInX')
    },750)

    $scope.goToLocation = function(){
      $state.go('setLocation');
    }
    $scope.employees = function(){
      $state.go('employees');
    }
    $scope.logout = function(){
      var confirmPopup = $ionicPopup.confirm({
     title: 'LOGOUT',
     template: '<center style="text-align: center">Are you sure?</center>'
   });

   confirmPopup.then(function(res) {
     if(res) {
       $state.go('home');
       location.reload();
     } else {

     }
   });

    }

    $scope.adminSettings = function(){
      $state.go('adminSettings');
    }


})
