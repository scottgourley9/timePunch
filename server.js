var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/timePunch');
var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:3000'
}
var app = express();
var port = 4000;

var Time = require('./models/time.js');
var User = require('./models/user.js');
var Shift = require('./models/shift.js');
var Admin = require('./models/admin.js');
var Request = require('./models/request.js');


app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(session({
  secret: 'whatever1234',
  saveUninitialized: false,
  resave: false
}))

app.post('/api/user/', function(req, res){
  req.body.name = req.body.name.toLowerCase();

  User.create(req.body, function(err, user){
    if(err){
      res.status(500).json(err);
    }
    else {
      res.status(200).json(true);
    }
  })
})
app.get('/api/user/:email/:password', function(req, res){
  User.findOne({'email': req.params.email}, function(err, user){
    if(err){
      res.status(500).json(err);
    }
    else {
      res.status(200).json(user)
    }

  })
})
app.get('/api/user/:id', function(req, res){

  Admin.findById(req.params.id, function(err, admin){
    if(err){
      res.status(500).json(err);
    }
    else {
      User.find(function(err, users){
        if(err){
          res.status(500).json(err);
        }
        else {
          var employees = [];
          for (var i = 0; i < users.length; i++){
            if(users[i].companyId === admin.companyId){
              employees.push(users[i]);
            }

          }

          res.status(200).json(employees);
        }
      })

    }
  })
})
app.delete('/api/user', function(req, res){
  User.remove(function(err, users){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(users)
    }
  })
})
app.delete('/api/user/:id', function(req, res){
  User.findByIdAndRemove(req.params.id, function(err, resp){
    if(err){
      res.status(500).json(err);
    }
    else {
      res.status(200).json('deleted')
    }
  })
})
app.post('/api/timeStamp', function(req, res){
  Time.create(req.body, function(err, resp){
    if(err){
      res.status(500).json(err);
    }
    else {
      res.status(200).json(resp)
    }
  })
})
app.get('/api/timeStamp/:id/:day', function(req, res){
  User.findById(req.params.id).populate('timeStamps').exec(function(err, times){
    if(err){
      res.status(500).json(err)
    }
    else {
      for(var i = 0; i < times.timeStamps.length; i++){
        if (times.timeStamps[i].day !== req.params.day){
          times.timeStamps.splice(i, 1);
          i--;
        }
      }
      res.status(200).json(times)
    }
  })
})
app.delete('/api/timeStamp', function(req, res){
  Time.remove(function(err, times){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(times)
    }
  })
})
app.put('/api/timeStamp/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, {$push: {timeStamps: req.body._id}}, function(err, response){
    if(err){
      res.status(500).json(err);
    }
    else {
      res.status(200).json(response);
    }
  })
})



app.post('/api/shift', function(req, res){

    Shift.create(req.body, function(err, shift){
      if(err){
        res.status(500).json(err);
      }
      else{
        User.findByIdAndUpdate(shift.user, {$push: {schedule: shift._id}}, function(err, response){
          if(err){
            res.status(500).json(err);
          }
          else {
            res.status(200).json(shift);
          }
        })

      }
    })


})
app.get('/api/schedule/:id', function(req, res){
  User.findById(req.params.id).populate('schedule').exec(function(err, user){
    if(err){
      res.status(500).json(err);
    }
    else {
      res.status(200).json(user.schedule);
    }
  })
})
app.delete('/api/shift', function(req, res){
  Shift.remove(function(err, shifts){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(shifts)
    }
  })
})
app.get('/api/shift/:employeeId', function(req, res){
  User.findById(req.params.employeeId).populate('schedule').exec(function(err, theEmployee){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(theEmployee.schedule)
    }
  })
})

app.post('/api/registerAdmin', function(req, res){
  Admin.create(req.body, function(err, admin){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(admin)
    }
  })
})
app.get('/api/admin/:email', function(req, res){
  Admin.findOne({'email': req.params.email}, function(err, adminUser){
    if(err){
      res.status(500).json(err);
    }
    else {
      console.log(adminUser);
      res.status(200).json(adminUser);
    }
  })
})

app.put('/api/changeAdminPassword/:id', function(req, res){
  Admin.findByIdAndUpdate(req.params.id, {$set: {password: req.body.password}}, function(err, success){
    if(err){
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
})
app.put('/api/changeAdminCompanyId/:id', function(req, res){
  Admin.findByIdAndUpdate(req.params.id, {$set: {companyId: req.body.companyId}}, function(err, success){
    if(err){
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
})
app.put('/api/changeUserPassword/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, {$set: {password: req.body.password}}, function(err, success){
    if(err){
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
})
app.put('/api/changeUserCompanyId/:id', function(req, res){
  User.findByIdAndUpdate(req.params.id, {$set: {companyId: req.body.companyId}}, function(err, success){
    if(err){
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true)
    }
  })
})

app.get('/api/timeStamps/:id', function(req, res){
  User.findById(req.params.id).populate('timeStamps').exec(function(err, user){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(user.timeStamps)
    }
  })
})

app.post('/api/request', function(req, res){
  Request.create(req.body, function(err, theRequest){
    if(err){
      res.status(500).json(false)
    }
    else {
      User.findByIdAndUpdate(theRequest.user, {$push: {requests: theRequest._id}}, function(err, posted){
      if(err){
        res.status(500).json(false)
      }
      else {
        res.status(200).json(true)
      }
      })
    }
  })
})

app.get('/api/getRequests/:id', function(req, res){
  User.findById(req.params.id).populate('requests').exec(function(err, user){
    if(err){
      res.status(500).json(err)
    }
    else {
      var userRequests = user.requests
      res.status(200).json(userRequests)
    }
  })
})

app.delete('/api/deleteRequest/:userId/:requestId', function(req, res){
  User.findByIdAndUpdate(req.params.userId, {$pull: {requests: req.params.requestId}}, function(err, deleted){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json('deleted')
    }

  })

})

app.put('/api/updateRequest/:userId/:requestId', function(req, res){
    Request.findByIdAndUpdate(req.params.requestId, {$set: {date: req.body.date, description: req.body.description, requestType: req.body.requestType, timeIn: req.body.timeIn, timeOut: req.body.timeOut}}, function(err, answer){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(answer)
    }
})
})

app.get('/api/requestsForAdmin/:id', function(req, res){
  User.findById(req.params.id).populate('requests').exec(function(err, user){
    if(err){
      res.status(500).json(err)
    }
    else {
      var userRequests = user.requests;
      res.status(200).json(userRequests);
    }
  })
})

app.put('/api/denyRequest/:id', function(req, res){
  Request.findByIdAndUpdate(req.params.id, {$set: {status: req.body.answer}}, function(err, answer){
    if(err){
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true);
    }
  })
})
app.put('/api/approveRequest/:id', function(req, res){
  Request.findByIdAndUpdate(req.params.id, {$set: {status: req.body.answer}}, function(err, answer){
    if(err){
      res.status(500).json(false)
    }
    else {
      res.status(200).json(true);
    }
  })
})







app.listen(port, function(){
  console.log('Listening to port '+ port);
})
