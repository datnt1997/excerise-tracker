const { Router } = require("express");
const UsersCtrl = require("../controller/users.controller");
const ExercisesCtrl = require("../controller/exercises.controller");

const router = new Router();

// associate put, delete, and get(id)
router.route("/")
  .get(UsersCtrl.getAllUsers)
  .post(UsersCtrl.createUser);
router.route("/:id/exercises").post(ExercisesCtrl.createExercise);
router.route("/:id/logs").get(ExercisesCtrl.getLogs);

module.exports = router;
