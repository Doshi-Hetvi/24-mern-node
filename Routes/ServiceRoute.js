const ServiceController = require('../controller/ServiceController');
const router = require('express').Router();


router.post("/service", ServiceController.createService);
router.get("/service", ServiceController.getService);
router.get("/service/provider/:id",ServiceController.getServiceByServiceProviderID)
router.get("/service/:id",ServiceController.getServiceById)
router.put("/service/:id",ServiceController.updateService)
router.delete("/service/:id",ServiceController.deleteService)
router.get("/service/filterservice",ServiceController.filterService)
router.get("/servicebycategory/:categoryId",ServiceController.getServiceByCategory)

module.exports = router;
