angular.module('timePunch').controller('loginCtrl', function($timeout, $ionicPopup, $document, $scope, $state, myService){

  $scope.logout = function(){
    var confirmPopup = $ionicPopup.confirm({
   title: 'LOGOUT',
   template: '<center style="text-align: center">Are you sure? <br> If CLOCKED IN you will be CLOCKED OUT</center>'
 });

 confirmPopup.then(function(res) {

   if(res && myService.stillIn) {
     var day = new Date();
     var theDay = day.toDateString();

     var dateObj = {
       day: theDay,
       timeStamp: day,
       inOrOut: 'OUT'
     }
     myService.postTimeStamp(dateObj).then(function(postTimeResponse){
       myService.postTimeStampToUser(postTimeResponse);
 })
     $state.go('home');
     location.reload();
   } else if(res){
     $state.go('home');
     location.reload();
   }
 });

  }

  var initLocalClocks = (function() {
    var date = new Date;
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    var hands = [
      {
        hand: 'hours',
        angle: (hours * 30) + (minutes / 2)
      },
      {
        hand: 'minutes',
        angle: (minutes * 6)
      },
      {
        hand: 'seconds',
        angle: (seconds * 6)
      }
    ];
    for (var j = 0; j < hands.length; j++) {
      var elements = document.querySelectorAll('.' + hands[j].hand);
      for (var k = 0; k < elements.length; k++) {
          elements[k].style.webkitTransform = 'rotateZ('+ hands[j].angle +'deg)';
          elements[k].style.transform = 'rotateZ('+ hands[j].angle +'deg)';
          if (hands[j].hand === 'minutes') {
            elements[k].parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
          }
      }
    }
  })();

$scope.navHidden = true;
$scope.loginSectionHidden = false;
$scope.aHidden = true;
$scope.inputHidden = true;
$scope.fakeLoginButtonHidden = false;
$scope.loginButtonHidden = true;
$scope.theClockHidden = false;

$scope.fakeLoginButton = function() {
  $scope.fakeLoginButtonHidden = true;
  $scope.loginButtonHidden = false;
  $scope.theClockHidden = true;
  $scope.theClockClass = [];
  $scope.theInputClass = [];
  $scope.theInputClass1 = [];
  $scope.theInputClass2 = [];
  $scope.theInputClass3 = [];
  $scope.theInputClass4 = [];

  $scope.theClockClass.push('animated fadeOutDown');
  $timeout(function(){
    $scope.inputHidden = false;

    $scope.theInputClass1.push('animated fadeInLeft');
    $scope.theInputClass2.push('animated fadeInRight');

    $scope.theInputClass4.push('animated fadeInDown');
  }, 650);

}

  $scope.loginButton = function(employee){


    myService.loginUser(employee).then(function(response){

      myService.currentUser = response.data;
      $scope.employeeName = response.data.name;
      if(response.data.success === false){
        $ionicPopup.alert({
          title: response.data.message,

        })
      }
      else {
        $scope.inputHidden = true;
        $scope.theInputClass.splice(0);
        $scope.theInputClass1.splice(0);
        $scope.theInputClass2.splice(0);
        $scope.theInputClass3.splice(0);
        $scope.theInputClass4.splice(0);

        $scope.theInputClass1.push('animated fadeOutRight');
        $scope.theInputClass2.push('animated fadeOutLeft');

        $scope.theInputClass4.push('animated fadeOutUp');
        $scope.titleClass = [];
        $scope.bottomClass = [];
        $scope.titleClass.push('animated fadeOutUp');
        $scope.bottomClass.push('animated fadeOutDown');
        $timeout(function(){



          $scope.navHidden = false;
          $scope.loginSectionHidden = true;
          $state.go('clock');
        }, 750);


      }
    });

  }

  $scope.onDoubleTap = function(){
    var popIt = $ionicPopup.show({
    title: 'Administrator Access',
    scope: $scope,
    buttons: [

      { text: 'Register',
        onTap: function(){
          return $scope.adminRegister();
        }
      },
      {
        text: 'Login',
        type: 'button-positive',
        onTap: function(){
          return $scope.adminLogin();
        }
      }
    ]
  });
  }

  $scope.adminLogin = function(){
    $scope.admin = {};
    var popIt = $ionicPopup.show({
      template: '<input type="email" placeHolder="Enter email..." ng-model="admin.email"> <br> <input placeHolder="Enter password..." type="password" ng-model="admin.password">',
    title: 'Enter Administrator Email & Password',

    scope: $scope,
    buttons: [
      { text: 'Cancel',

      },
      {
        text: 'Enter',
        type: 'button-positive',
        onTap: function() {

            myService.loginAsAdmin($scope.admin).then(function(response){
              myService.currentAdmin = response.data;

              if(response.data.success){
                $scope.loginSectionHidden = true;
                $state.go('admin');

              }
              else{
                
                  $ionicPopup.alert({
                    title: response.data.message,

                  })

              }
            })
        }
      }
    ]
  });
  }
  $scope.adminRegister = function(){
    $scope.admin = {};
    var popIt = $ionicPopup.show({
      template: '<center>ALL DESIRED USERS MUST USE SAME COMPANY ID</center><br><input type="text" placeHolder="Enter full name..." ng-model="admin.name"><br><input type="email" placeHolder="Enter email..." ng-model="admin.email"> <br> <input placeHolder="Enter password..." type="password" ng-model="admin.password"> <br> <input placeHolder="Create Company ID..." type="text" ng-model="admin.companyId">',
    title: 'REGISTRATION as ADMINISTRATOR',

    scope: $scope,
    buttons: [
      { text: 'Cancel',

      },
      {
        text: 'Register',
        type: 'button-positive',
        onTap: function() {
          myService.registerAsAdmin($scope.admin).then(function(response){
            myService.currentAdmin = response.data;
            if(response){
              $ionicPopup.alert({
               title: 'Registration Successful!',
               template: '<center>Now please Login</center>'
             });
            }
            else{
              $ionicPopup.alert({
                title: 'INVALID ADMIN KEY'

              })
              $scope.admin = '';
            }
          })

        }
      }
    ]
  });
  }


  $scope.registerButton = function(){
    $scope.employeeR = {};
    var popIt = $ionicPopup.show({
      template: '<center>Must have VALID COMPANY ID</center> <br><center>If you have FORGOTTEN or NEED your COMPANY ID please CONTACT your ADMINISTRATOR</center><br><input type="text" placeHolder="Enter First AND Last name..." ng-model="employeeR.name"> <br> <input type="email" placeHolder="Enter email..." ng-model="employeeR.email"> <br> <input placeHolder="Create password..." type="password" ng-model="employeeR.password"> <br> <input placeHolder="Enter Company ID..." type="text" ng-model="employeeR.companyId">',
    title: 'Registration',

    scope: $scope,

    buttons: [
      { text: 'Cancel',

      },
      {
        text: 'Register',
        type: 'button-positive',
        onTap: function() {
          myService.registerUser($scope.employeeR).then(function(response){
          $scope.employeeR = '';
            if(response){
              $ionicPopup.alert({
               title: 'Registration Successful!',
               template: '<center>Now please Login</center>'
             });
            }
            else{
              $ionicPopup.alert({
                title: 'INVALID COMPANY ID'

              })

            }
          })

        }
      }
    ]
  });

  }

  $scope.showMenu = function(){
    $scope.aHidden = !$scope.aHidden;
    $scope.myClass = [];
    if(!$scope.aHidden){
      $scope.myClass.splice(0);
      $scope.myClass.push('animated bounceInRight');
    }
    else if($scope.aHidden){
      $scope.myClass.splice(0);
      $scope.myClass.push('animated bounceOutRight');
    }
  }
  $scope.forgotten = function(){
    $scope.navHidden = true;
    $scope.loginSectionHidden = true;
    $scope.aHidden = true;
  }


})
