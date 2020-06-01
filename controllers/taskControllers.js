const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

//CREATE A NEW TASK
exports.createTask = async (req, res) => {
  //check if errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Extract project and probe that exists

  try {
    const { project } = req.body;
    //check if project exists
    const projectFound = await Project.findById(project);
    if (!projectFound) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //check if current project owner is the user authenticated
    if (projectFound.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //create task
    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error on server");
  }
};

//OBTAIN TASKS BY PROJECT
exports.obtainTaks = async (req, res) => {
  try {
    const { project } = req.body;
    //check if project exists
    const projectFound = await Project.findById(project);
    if (!projectFound) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //check if current project owner is the user authenticated
    if (projectFound.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //obtain tasks by project
    const tasks = await Task.find({ project });

    //send json
    res.json({ tasks });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};

//UPDATE A TASK
exports.updateTask = async (req, res) => {
  try {
    const { project, name, status } = req.body;

    //check if task exists
    let taskFound = await Task.findById(req.params.id);

    if (!taskFound) {
      return res.status(404).json({ msg: "Task not found" });
    }

    //extract project correspondant with the task
    const projectFound = await Project.findById(project);

    //check if current project owner is the user authenticated
    if (projectFound.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //creating new object of new task
    const newTask = {};
    if (name) newTask.name = name;
    if (status) newTask.status = status;

    //save new task
    taskFound = await Task.findOneAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    res.json(taskFound);
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};
//DELETE A TASK
exports.deleteTask = async (req, res) => {
  try {
    const { project } = req.body;

    //check if task exists
    let taskFound = await Task.findById(req.params.id);

    if (!taskFound) {
      return res.status(404).json({ msg: "Task not found" });
    }

    //extract project correspondant with the task
    const projectFound = await Project.findById(project);

    //check if current project owner is the user authenticated
    if (projectFound.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //delete
    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};
