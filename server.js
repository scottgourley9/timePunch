var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/timePunch');
var cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:3000'
}
var moment = require('moment');
var jwt = require('jwt-simple');
var key = require('./keys.js');


var app = express();
var port = 4000;

var Time = require('./models/time.js');
var User = require('./models/user.js');
var Shift = require('./models/shift.js');
var Admin = require('./models/admin.js');
var Request = require('./models/request.js');
var TheLocation = require('./models/location.js');


app.use(express.static(__dirname + '/www'));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(session({
  secret: 'whatever1234',
  saveUninitialized: false,
  resave: false
}))



function createJWT(user) {
 var payload = {
   sub: user._id,
   iat: moment().unix(),
   exp: moment().add(14, 'days').unix()
 };
 return jwt.encode(payload, Keys.TOKEN_SECRET);
},
userLogin : function(req, res) {
   console.log(req);

  },
  userSignUp: function(req, res) {
    console.log("hi")
      console.log(req.body);
      User.findOne({ email: req.body.email }, function(err, existingUser) {
        if (existingUser) {
          return res.status(409).send({ message: 'Email is already taken' });
        }
        var user = new User({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        user.save(function(err, result) {
          if (err) {
            res.status(500).send({ message: err.message });
          }
          console.log(result);
          res.send({ token: createJWT(result) });
        });
      });
  },

  ensureAuthenticated: function(req, res, next) {































app.post('/api/user/', function(req, res){

  User.create(req.body, function(err, user){
    if(err){
      res.status(500).json(err);
    }
    else {
      res.status(200).json(true);
    }
    res.send({ token: createJWT(result) });
  })

















  // req.body.name = req.body.name.toLowerCase();
  //
  // User.create(req.body, function(err, user){
  //   if(err){
  //     res.status(500).json(err);
  //   }
  //   else {
  //     res.status(200).json(true);
  //   }
  // })
})
app.get('/api/user/:email/:password', function(req, res){
  User.findOne({'email': req.params.email}, function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
    user.comparePassword(req.params.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid password' });
      }
      res.send({ token: createJWT(user) });
    });
  });
















  // User.findOne({'email': req.params.email}, function(err, user){
  //   if(err){
  //     res.status(500).json(err);
  //   }
  //   else {
  //     res.status(200).json(user)
  //   }
  //
  // })
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
app.put('/api/timeStampApprove/:id', function(req, res){
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
  console.log(req.body);
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
app.delete('/api/clearTime/:day', function(req, res){
  Time.remove({day: req.params.day}, function(err, answer){
    if(err){
      res.status(500).json(err)
    }
    else {
          res.status(200).json(true)
    }
  })
})
app.put('/api/changeTime/:day', function(req, res){
    Time.create(req.body, function(err, createdTime){
      if(err){
        res.status(500).json(err)
      }
      else {
        res.status(200).json(createdTime);
      }
    })
})
app.post('/api/postLocation/:userId', function(req, res){
  TheLocation.create(req.body, function(err, createdLocation){
    if(err){
      res.status(500).json(err)
    }
    else {
      User.findByIdAndUpdate(req.params.userId, {$push: {locations: createdLocation._id}}, function(err, theResponse){
        if(err){
          res.status(500).json(err)
        }
        else {
          res.status(200).json("locationCreatedAndPushedToUser");
        }
      })
    }
  })
})

app.get('/api/getUserLocations/:id', function(req, res){
  User.findById(req.params.id).populate('locations').exec(function(err, user){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(user.locations)
    }
  })
})

app.put('/api/setLocationOnAdmin/:id', function(req, res){
  Admin.findByIdAndUpdate(req.params.id, {$set: {setLocationLat: req.body.lat, setLocationLng: req.body.lng, noLocation: false}}, function(err, theRes){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(theRes)
    }
  })
})

app.get('/api/getAdminFromCompanyId/:companyId', function(req, res){
  Admin.findOne({companyId: req.params.companyId}, function(err, admin){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(admin)
    }
  })
})

app.put('/api/noRestriction/:id', function(req, res){
  Admin.findByIdAndUpdate(req.params.id, {$set: {noLocation: req.body.restricted}}, function(err, aRes){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(aRes)
    }
  })
})

app.put('/api/updateAdminAddress/:id', function(req, res){
  Admin.findByIdAndUpdate(req.params.id, {$set: {setAddress: req.body}}, function(err, theRes){
    if(err){
      res.status(500).json(err)
    }
    else {
      res.status(200).json(theRes)
    }
  })
})

app.put('/api/updateTimeStamp', function(req, res){

    Time.findByIdAndUpdate(req.body.id, {$set: {timeStamp: req.body.timeStamp}}, function(err, update){
      if(err){
        res.status(500).json(err);
      }
      else {
        res.status(200).json(update)
      }
})

})



app.listen(port, function(){
  console.log('Listening to port '+ port);
})
