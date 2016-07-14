var express = require('express');
// var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./config.js');
mongoose.connect(config.database);

var cors = require('cors');

// var morgan = require('morgan');
var jwt = require('jsonwebtoken');


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
var TheLocation = require('./models/location.js');

app.set('superSecret', config.secret);
app.use(express.static(__dirname + '/www'));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors(corsOptions));
// app.use(session({
//   secret: 'whatever1234',
//   saveUninitialized: false,
//   resave: false
// }))









app.post('/api/user/', function(req, res){
  // req.body.name = req.body.name.toLowerCase();

  User.create(req.body, function(err, user){
    if(err){
      res.status(500).json(err);
    }
    else {
      res.status(200).json(true);
    }
  })
})

app.post('/api/authenticate', function(req, res){

  User.findOne({'email': req.body.email}, function(err, user){
    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON

        var editedUser = {
          token: token,
          _id: user._id,
          name: user.name,
          companyId: user.companyId,
          email: user.email,
          locations: user.locations,
          requests: user.requests,
          schedule: user.schedule,
          timeStamps: user.timeStamps,
          success: true
        }
        res.json(editedUser);
      }

    }
})
})
app.post('/api/authenticateAdmin', function(req, res){
  
  Admin.findOne({'email': req.body.email}, function(err, admin){
    if (err) throw err;

    if (!admin) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (admin) {

      // check if password matches
      if (admin.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(admin, app.get('superSecret'), {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON

        var editedAdmin = {
          token: token,
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          companyId: admin.companyId,
          setLocationLat: admin.setLocationLat,
          setLocationLng: admin.setLocationLng,
          noLocation: admin.noLocation,
          setAddress: admin.setAddress,
          success: true
        }
        res.json(editedAdmin);
      }

    }
})
})
var apiRoutes = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)


// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
});


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

app.use('/api', apiRoutes);

app.listen(port, function(){
  console.log('Listening to port '+ port);
})
