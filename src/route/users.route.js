const { Router } = require("express");
const UsersCtrl = require ("../controller/users.controller");
const ExercisesCtrl = require("../controller/exercises.controller");

const router = new Router();

// associate put, delete, and get(id)
router.route("/").post(UsersCtrl.createUser);
router.route("/").get(UsersCtrl.getAllUsers);
router.route("/:id/exercises").post(ExercisesCtrl.createExercise);

module.exports = router;
