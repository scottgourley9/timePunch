angular.module('timePunch').controller('employeesCtrl', function($state, $ionicPopup, $rootScope, $timeout, $scope, myService){

  $scope.menu = function(){
    $state.go('admin')
  }



  $scope.theEmployeeList = false;
  $scope.employeeInfo = true;
  $scope.backAdminButton = false;
  $scope.backOneAdminButton = true;



  $scope.showUserInfo = function(employee){
    $scope.employeeSelected = employee;
    $scope.employee = employee.name;
    $scope.theEmployeeList = true;
    $scope.employeeInfo = false;
    $scope.backOneAdminButton = false;
    $scope.backAdminButton = true;

  }

  $rootScope.$on('$stateChangeSuccess', function(){
    $scope.entireEmployeeSection = myService.employeeSectionShowing;
    $scope.backButtonsAndLogoutButtonSectionHidden = myService.backButtonsAndLogoutButtonSectionHidden;
  })

  $scope.goToSchedule = function(){
    myService.employeeSectionShowing = true;
    myService.backButtonsAndLogoutButtonSectionHidden = true;
    $state.go('adminSchedule');
  }
  $scope.goToTime = function(){
    myService.employeeSectionShowing = true;
    myService.backButtonsAndLogoutButtonSectionHidden = true;
    
    $state.go('time');
  }


  $scope.getEmployees = function(){
    myService.getEmployees().then(function(response){
      $scope.employees = response.data;
    })
  };
  $scope.getEmployees();

  $scope.back = function(){

    $state.go('admin')

  }
  $scope.backOne = function(){
    $scope.theEmployeeList = false;
    $scope.employeeInfo = true;
    $scope.backOneAdminButton = true;
    $scope.backAdminButton = false;
  }

  $scope.removeEmployee = function(){
    var confirmPopup = $ionicPopup.confirm({
     title: 'REMOVE',
     template: '<center>Are you sure you want to REMOVE this USER?<center><br><center>This will REMOVE ALL USER DATA!'
   });

   confirmPopup.then(function(res) {
     if(res) {
       myService.removeEmployee($scope.employeeSelected._id);
       $scope.getEmployees();
       $scope.theEmployeeList = false;
       $scope.employeeInfo = true;
     } else {

     }
   });

  }

})
