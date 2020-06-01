const express = require("express");
const router = express.Router();
const projectControllers = require("../controllers/projectControllers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//create a project
// POST api/projects
router.post(
  "/",
  auth,
  [check("name", "A name for a project is mandatory").not().isEmpty()],
  projectControllers.createProject
);

//obtain all projects realed to user authenticated
// GET api/projects
router.get("/", auth, projectControllers.obtainAllProjects);

//Update a project by ID
//PUT api/projects
router.put(
  "/:id",
  auth,
  [check("name", "A name for a project is mandatory").not().isEmpty()],
  projectControllers.updateProject
);

//Delete a project by ID
//DELETE api/projects
router.delete("/:id", auth, projectControllers.deleteProject);

module.exports = router;
