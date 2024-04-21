const routes = require("express").Router();
const addressController = require("../controller/AddressController");

routes.get("/address", addressController.getaddress);
routes.get("/address/:id", addressController.getaddressById);
routes.post("/address", addressController.createaddress);
routes.put("/address/:id", addressController.updateaddress);
routes.delete("/address/:id", addressController.deleteaddress);

module.exports = routes;