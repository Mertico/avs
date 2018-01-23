'use strict';

module.exports = function(app) {
	var mongoose = require('mongoose'),
	    Task = mongoose.model('Task');
	// List Routes
	app.route('/task/')
		.get((req, res) => {
			Task.find({}, function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
		  })
		})
		.post((req, res) => {
			var tasks = new Task(req.body);
		  tasks.save(function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
		  })
		});
	app.route('/task/:taskId')
		.get((req, res) => {
			Task.findById({ _id: req.params.taskId }, function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
		  })
		})
		.put((req, res) => {
			Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
	  	})
		})
		.delete((req, res) => {
			Task.remove({
		    _id: req.params.taskId
		  }, function(err, value) {
		    if (err)
		      res.send(err);
        // Тут нужно сделать удаление зависимостей в проектах
		    res.json({ message: 'Task successfully deleted' });
		  })
		});
};
