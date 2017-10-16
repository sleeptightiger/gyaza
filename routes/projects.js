const db = require('../models');

function getGoal(req, res) {
  db.Goal.find({}, function(err, data) {
    if (err) {
      console.log('Error retrieving goal from DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(data);
    }
  });
}

function createGoal(req, res) {
  const newGoal = db.Goal({
    description: req.body.description,
    voteToActive: req.body.voteToActive,
    voteToComplete: req.body.voteToComplete
  });

  newGoal.save(function(err, data) {
    if (err) {
      console.log('Error saving goal to DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).json(data);
    }
  });
};

function findGoalById(req, res) {
  db.Goal.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
};

function changeGoal(req, res) {
   db.Goal.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    res.json(data);
  });
};

function deleteGoal(req, res) {
  console.log('Goal deleted: ', req.params.id);
  db.Goal.findOneAndRemove({ _id: req.params.id })
  .exec(function (err, deletedGoal) {
    res.json(deletedGoal);
  });
};


//Project methods
function getProject(req, res) {
  db.Project.find({}, function(err, data) {
    if (err) {
      console.log('Error retrieving project from DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(data);
    }
  });
}

function createProject(req, res) {
  const newProject = db.Project({
    name: req.body.name,
    contributors: req.body.contributors,
    description: req.body.description,
    completed: req.body.completed,
    goals: req.body.goals,
    chat: req.body.chat
  });

  newProject.save(function(err, data) {
    if (err) {
      console.log('Error saving project to DB.', err);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).json(data);
    }
  });
};

function findProjectById(req, res) {
  db.Project.findOne({_id: req.params.id }, function(err, data) {
    res.json(data);
  });
};

function changeProject(req, res) {
   db.Project.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    res.json(data);
  });
};

function deleteProject(req, res) {
  console.log('Project deleted: ', req.params.id);
  db.Project.findOneAndRemove({ _id: req.params.id })
    .exec(function (err, deletedProject) {
      res.json(deletedProject);
    });
  };



module.exports = {
  getGoal: getGoal,
  createGoal: createGoal,
  findGoalById: findGoalById,
  changeGoal: changeGoal,
  deleteGoal: deleteGoal,
  getProject: getProject,
  createProject: createProject,
  findProjectById: findProjectById,
  changeProject: changeProject,
  deleteProject: deleteProject
}
