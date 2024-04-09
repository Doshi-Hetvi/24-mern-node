const ServiceController = require('../controller/ServiceController');
const router = require('express').Router();


router.post("/service", ServiceController.createService);
router.get("/service", ServiceController.getService);
router.get("/service/provider/:id",ServiceController.getServiceByServiceProviderID)
router.get("/service/:id",ServiceController.getServiceById)
router.put("/service/:id",ServiceController.updateService)
router.delete("/service/:id",ServiceController.deleteService)
router.get("/service/filterservice/:id",ServiceController.filterService)

module.exports = router;
