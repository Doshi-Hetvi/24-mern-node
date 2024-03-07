const TypeController = require('../controller/TypeController');
const router = require('express').Router();
router.post("/type", TypeController.createType);
router.get("/type", TypeController.getType);
router.get("/type/:id",TypeController.getTypeById)
router.put("/type/:id",TypeController.updateType)
router.delete("/type/:id",TypeController.deleteType)

module.exports = router;