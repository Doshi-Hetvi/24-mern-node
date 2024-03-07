const UserController = require('../controller/UserController');
const router = require('express').Router();
router.post("/user", UserController.createUser);
router.get("/user", UserController.getUser);
router.get("/user/:id",UserController.getUserById)
router.put("/user/:id",UserController.updateUser)
router.delete("/user/:id",UserController.deleteUser)
router.post("/user/login",UserController.loginUser)

module.exports = router;