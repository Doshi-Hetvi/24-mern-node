const ServiceProviderController = require('../controller/ServiceProviderController');
const router = require('express').Router();
router.post("/serviceprovider", ServiceProviderController.createServiceProvider);
router.get("/serviceprovider", ServiceProviderController.getServiceProvider);
router.get("/serviceprovider/:id",ServiceProviderController.getServiceProviderById)
router.put("/serviceprovider/:id",ServiceProviderController.updateServiceProvider)
router.delete("/serviceprovider/:id",ServiceProviderController.deleteServiceProvider)
router.post("/serviceprovider/login",ServiceProviderController.loginServiceProvider)

module.exports = router;