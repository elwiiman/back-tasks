const Project = require("../models/Project");
const { validationResult } = require("express-validator");

// CREATE A PROJECT
exports.createProject = async (req, res) => {
  //check if errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // create a new project
    const project = new Project(req.body);

    // extrac creator via jsonwebtoken
    project.creator = req.user.id;

    // save the collection
    project.save();

    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};

//OBTAIN ALL PROJECTS OF A USER
exports.obtainAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user.id })
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was an error");
  }
};

//UPDATE A PROJECT
exports.updateProject = async (req, res) => {
  //check if errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //Extract project info
  const { name } = req.body;
  const newProject = {};
  if (name) {
    newProject.name = name;
  }

  try {
    //check the ID
    let project = await Project.findById(req.params.id);

    //check if project exists
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //check project creator
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //update
    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    //API answer
    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a server error");
  }
};

//DELETE A PROJECT BY ID
exports.deleteProject = async (req, res) => {
  try {
    //check the ID
    let project = await Project.findById(req.params.id);

    //check if project exists
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    //check project creator
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    //delete
    await Project.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: `Project ${project.name} has been deleted` });

    //API answer
    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send("There was a server error");
  }
};
