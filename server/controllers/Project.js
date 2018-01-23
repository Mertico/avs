'use strict';

module.exports = function(app) {
	var mongoose = require('mongoose'),
	    ProjectTasks = mongoose.model('ProjectTasks'),
	    ProjectContacts = mongoose.model('ProjectContacts'),
	    Project = mongoose.model('Project'),
    	Task = mongoose.model('Task');

	// List Routes
	app.route('/project/')
		.get((req, res) => {
			Project.find({}, function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
		  })
		})
		.post((req, res) => {
			var project = new Project(req.body);
		  project.save(function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
		  })
		});
	app.route('/project/:projectId')
		.get((req, res) => {
      var result;
      var returnResult = (result) => {
        if (!result)
            res.send(errs);
        res.json(result);
      }

      Project.findById({ _id: req.params.projectId }).exec(function(err, value) {
        result = JSON.parse(JSON.stringify(value))
        result.tasks.forEach(function(task, i,arr) {
          Task.findById({ _id: task.id }).exec(function(err, v) {
            result.tasks[i].name = v.name
            result.tasks[i].type = v.type
            result.tasks[i].hours = v.hours
            if(i+1 == arr.length)
              returnResult(result)
          })
        })
		  })
		})
		.put((req, res) => {
      Project.findOneAndUpdate({ _id: req.params.projectId }, { $set:req.body },{new: true}, function(err, value) {
		    if (err)
		      res.send(err);
		    res.json(value);
		  })
		})
		.delete((req, res) => {
			Project.remove({
		    _id: req.params.projectId
		  }, function(err, value) {
		    if (err)
		      res.send(err);
		    res.json({ message: 'Project successfully deleted' });
		  })
		});
  //
	// app.route('/project/:projectId/stage/:stageId')
	//   .post((req, res) => {
	// 		Project.findOneAndUpdate(
	// 	  { _id: req.params.projectId, "stage._id": req.params.stageId },
	// 	  { $push: { "stage.$.task": req.body } } , function(err, value) {
	// 	    if (err)
	// 	      res.send(err);
	// 	    res.json({ message: 'Stage successfully add task' });
	// 	  })
	// 	})
	//   .put((req, res) => {
	// 		Project.findOneAndUpdate(
	// 	  { _id: req.params.projectId, "stage._id": req.params.stageId },
	// 	  { $set: { "stage.$.name" : req.body.name } } , function(err, value) {
	// 	    if (err)
	// 	      res.send(err);
	// 	    res.json({ message: 'Stage successfully rename' });
	// 	  })
	// 	})
	//   .delete((req, res) => {
	// 		Project.findOneAndUpdate({ _id: req.params.projectId }, {$pull: {stage: {_id: req.params.stageId}}}, function(err, value) {
	// 	    if (err)
	// 	      res.send(err);
	// 	    res.json({ message: 'Stage successfully deleted' });
	// 	  })
	// 	});
	// app.route('/project/:projectId/stage/:stageId/task/:taskId')
	// 	.put((req, res) => {
	// 		Project.findOneAndUpdate(
	// 	  { _id: req.params.projectId, "stage._id": req.params.stageId, "stage.task._id": req.params.taskId},
	// 	  { "stage.$.task" : req.body } , function(err, value) {
	// 	    if (err)
	// 	      res.send(err);
	// 	    res.json({ message: 'Task successfully update' });
	// 	  })
	// 	}) //
	// 	.delete((req, res) => {}); //

};
