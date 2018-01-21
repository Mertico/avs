'use strict';

module.exports = function(app) {
	var mongoose = require('mongoose'),
	    Users = mongoose.model('Users');

  // Middleware
  app.use(function (req, res, next) {
    console.log('===============  NEW CONNECT ===============');
    req.isAuth = false;
    Users.find({ email: req.cookies.email, password: req.cookies.password}, function(err, value) {
      if (err)
        res.status(400).send(err);
      if (value.length == 1) {
        req.isAuth = true
        req.userInfo = value[0]
        req.userInfo.password = undefined
        
        console.log('Authentication: ',"\x1b[32m",'Success',"\x1b[0m", req.cookies.email);
        next();
      } else {
        console.log('Authentication: ',"\x1b[31m",'Failure',"\x1b[0m");
        next();
      }
    })
  });
  app.use(function (req, res, next) {

    if (req.isAuth || req.path==='/auth' || req.path==='/auth/' || req.path==='/reg' || req.path==='/reg/') {
      console.log("Route: ",req.path,"\x1b[32m",'Access',"\x1b[0m");
      next();
    } else {
      console.log("Route: ",req.path,"\x1b[32m",'Blocked',"\x1b[0m");
      res.status(403).send({ message: 'Error 403 Forbidden' });
    }
  });
	// List Routes

  // isAuth???
	app.route('/isAuth/')
		.get((req, res) => {
			res.status(200).json({ message: 'Authorization' , userInfo: req.userInfo});
		})

	// New user
	app.route('/reg/')
		.post((req, res) => {
			var users = new Users(req.body);
			users.save(function(err, value) {
				if (err)
					res.send(err);
				res.json(value);
			})
		});

	app.route('/auth/')
		.post((req, res) => {
      Users.find({ email: req.body.email, password: req.body.password}, function(err, value) {
		    if (err)
		      res.status(400).send(err);

        if (value.length == 1) {
          let options = {
            maxAge: 1000 * 60 * 60, // would expire after 60 minutes
            httpOnly: true, // The cookie only accessible by the web server
            signed: false // Indicates if the cookie should be signed
          }
          // Set cookie
          res.cookie('email', value[0].email, options)
          res.cookie('password', value[0].password, options)

          console.log('Authorization:',"\x1b[32m",'Success',"\x1b[0m");
          res.status(200).json({ message: 'Authorization success' });
        } else {
          console.log('Authorization:',"\x1b[31m",'Failure',"\x1b[0m");
          res.status(400).json({ message: 'Authorization failure' });
        }

		  })

	})
  .delete((req, res) => {
    console.log('De-authorization:',"\x1b[32m",'Success',"\x1b[0m");
    var cookie = req.cookies;
    for (var prop in cookie) {
        if (!cookie.hasOwnProperty(prop)) {
            continue;
        }
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.status(200).json({ message: 'De-authorization success' });
  });
};
