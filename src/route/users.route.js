const { Router } = require("express");
const UsersCtrl = require ("../controller/users.controller");

const router = new Router();

// associate put, delete, and get(id)
router.route("/").post(UsersCtrl.createUser);
router.route("/").get(UsersCtrl.getAllUsers);
router.route("/:id/exercises").post(UsersCtrl.createUser);

module.exports = router;
