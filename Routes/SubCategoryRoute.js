const SubCategoryController = require('../controller/SubCategoryController');
const router = require('express').Router();
router.post("/subcategory", SubCategoryController.createSubCategory);
router.get("/subcategory", SubCategoryController.getSubCategory);
router.get("/subcategory/:id",SubCategoryController.getSubCategoryById)
router.put("/subcategory/:id",SubCategoryController.updateSubCategory)
router.delete("/subcategory/:id",SubCategoryController.deleteSubCategory)

module.exports = router;