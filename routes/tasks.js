const express = require("express");
const router = express.Router();
const taskControllers = require("../controllers/taskControllers");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//Create a task
// POST api/tasks
router.post(
  "/",
  auth,
  [
    check("name", "Name for task is mandatory").not().isEmpty(),
    check("project", "Project id for task is mandatory").not().isEmpty(),
  ],
  taskControllers.createTask
);

//Obtain tasks with a project id sent via body
//GET api/tasks
router.get("/", auth, taskControllers.obtainTaks);

//Update a task
//PUT api/tasks/id
router.put("/:id", auth, taskControllers.updateTask);

//Delete a task
//DELETE  api/tasks/id
router.delete("/:id", auth, taskControllers.deleteTask);

module.exports = router;
