const CategoryController = require('../controller/CategoryController')
const router = require('express').Router();
router.post("/category", CategoryController.createCategory);
router.get("/category", CategoryController.getCategory);
router.get("/category/:id",CategoryController.getCategoryById)
router.put("/category/:id",CategoryController.updateCategory)
router.delete("/category/:id",CategoryController.deleteCategory)

module.exports = router;