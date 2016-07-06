angular.module('timePunch').service('myService', function($rootScope, $location, $interval, $q, $http){



  this.stillIn;
  this.employeeSectionShowing;
  this.backButtonsAndLogoutButtonSectionHidden;


  this.registerUser = function(employee){
    return $http({
      method: "POST",
      url: '/api/user',
      data: employee
    })
  }
  this.loginUser = function(employee){

    return $http({
      method: "GET",
      url: '/api/user/' + employee.email + "/" + employee.password
    })
  }

  this.postTimeStamp = function(dateObj){
    return $http({
      method: "POST",
      url: '/api/timeStamp',
      data: dateObj
    })
  }
  this.currentUser;
  this.getTimes = function(day){
    return $http({
      method: "GET",
      url: '/api/timeStamp/' + this.currentUser._id + '/' + day
    })
  }

  this.postTimeStampToUser = function(postedTimeStampObj){
    return $http({
      method: "PUT",
      url: '/api/timeStamp/' + this.currentUser._id,
      data: postedTimeStampObj.data
    })
  }

  this.getUserSchedule = function(){
    return $http({
      method: "GET",
      url: '/api/schedule/' + this.currentUser._id
    })
  }

  this.currentAdmin;
  this.registerAsAdmin = function(admin){
    return $http({
      method: "POST",
      url: "/api/registerAdmin",
      data: admin
    })
  }
  this.loginAsAdmin = function(admin){
    return $http({
      method: "GET",
      url: "/api/admin/" + admin.email

    })
  }
  this.getEmployees = function(){
    return $http({
      method: "GET",
      url: "/api/user/" + this.currentAdmin._id
    })
  }

  this.submitShift = function(shift){
    return $http({
      method: "POST",
      url: "/api/shift",
      data: shift
    })
  }

  this.getEmployeeScheduleForAdmin = function(employeeId){
    return $http({
      method: "GET",
      url: '/api/shift/' + employeeId
    })
  }

  this.removeEmployee = function(employeeId){
    return $http({
      method: "DELETE",
      url: '/api/user/' + employeeId
    })
  }

  this.changePassword = function(newPassword, adminId){
    return $http({
      method: "PUT",
      url: '/api/changeAdminPassword/' + adminId,
      data: {password: newPassword}
    })
  }
  this.changeCompanyId = function(newCompanyId, adminId){
    return $http({
      method: "PUT",
      url: '/api/changeAdminCompanyId/' + adminId,
      data: {companyId: newCompanyId}
    })
  }
  this.changePasswordUser = function(newPassword, userId){
    return $http({
      method: "PUT",
      url: '/api/changeUserPassword/' + userId,
      data: {password: newPassword}
    })
  }
  this.changeCompanyIdUser = function(newCompanyId, userId){
    return $http({
      method: "PUT",
      url: '/api/changeUserCompanyId/' + userId,
      data: {companyId: newCompanyId}
    })
  }
  this.getEmployeeTimeStamps = function(){
    return $http({
      method: "GET",
      url: '/api/timeStamps/' + this.currentUser._id
    })
  }
  this.getEmployeeTimeStampsAdmin = function(employeeId){
    return $http({
      method: "GET",
      url: '/api/timeStamps/' + employeeId
    })
  }

  this.newRequest = function(theRequest){
    theRequest.user = this.currentUser._id;
    return $http({
      method: "POST",
      url: '/api/request',
      data: theRequest
    })
  }
  this.getRequests = function(){
    return $http({
      method: "GET",
      url: '/api/getRequests/' + this.currentUser._id
    })
  }

  this.removeRequestFromUser = function(requestId){
    return $http({
      method: "DELETE",
      url: '/api/deleteRequest/' + this.currentUser._id + "/" + requestId
    })
  }
  this.removeRequestFromUserAdmin = function(requestId, userSelected){
    return $http({
      method: "DELETE",
      url: '/api/deleteRequest/' + userSelected._id + "/" + requestId
    })
  }
  this.editRequestFromUser = function(requestId, updateRequest){
    return $http({
      method: "PUT",
      url: '/api/updateRequest/' + this.currentUser._id + "/" + requestId,
      data: updateRequest
    })
  }
  this.getUserRequestsForAdmin = function(user){
    return $http({
      method: "GET",
      url: "/api/requestsForAdmin/" + user._id
    })

  }

  this.denyRequest = function(requestId){
    return $http({
      method: "PUT",
      url: '/api/denyRequest/' + requestId,
      data: {answer: "DENIED"}
    })
  }

  this.approveRequest = function(requestId){
    return $http({
      method: "PUT",
      url: '/api/approveRequest/' + requestId,
      data: {answer: "APPROVED"}
    })
  }

  })
