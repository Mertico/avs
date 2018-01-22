'use strict';

module.exports = function(app) {
	var mongoose = require('mongoose'),
	    Users = mongoose.model('Task');
	// List Routes
	app.route('/task/')
		.get((req, res) => {
			Users.find({}, function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
		  })
		})
		.post((req, res) => {
			var users = new Users(req.body);
		  users.save(function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
		  })
		});
	app.route('/task/:userId')
		.get((req, res) => {
			Users.findById({ _id: req.params.userId }, function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
		  })
		})
		.put((req, res) => {
			Users.findOneAndUpdate({ _id: req.params.userId }, req.body, function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
	  	})
		})
		.delete((req, res) => {
			Users.remove({
		    _id: req.params.userId
		  }, function(err, value) {
		    if (err)
		      res.send(err);
        // Тут нужно сделать удаление зависимостей в проектах
		    res.json({ message: 'Task successfully deleted' });
		  })
		});
};
