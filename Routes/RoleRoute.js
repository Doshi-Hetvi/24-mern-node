const RoleController = require('../controller/RoleController');
const router = require('express').Router();
router.post("/role", RoleController.createRole);
router.get("/role", RoleController.getRole);
router.get("/role/:id",RoleController.getRoleById)
router.put("/role/:id",RoleController.updateRole)
router.delete("/role/:id",RoleController.deleteRole)

module.exports = router;