angular.module('timePunch').controller('adminCtrl', function($ionicPopup, $timeout, $state, $scope, myService){



  $scope.theRequestsNumberHidden = true;

  $timeout(function(){
    $scope.theRequestsNumberHidden = false;
  }, 1250)

  $scope.getAllRequests = function(){
    myService.getAllRequests().then(function(response){
      $scope.requests = [];
      for (var i = 0; i < response.data.length; i++){
        if(response.data[i].status === "Pending"){
          $scope.requests.push(response.data[i])
        }
      }
      $scope.pendingRequests = $scope.requests.length;

    })
  }
  $scope.getAllRequests();


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
    $scope.goToRequests = function(){
      $state.go('requests');
    }


})
