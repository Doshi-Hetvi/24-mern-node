const BookingController = require('../controller/BookingController');
const router = require('express').Router();
router.post("/booking", BookingController.createBooking);
router.get("/booking", BookingController.getBooking);
router.get("/booking/:id",BookingController.getBookingById)
router.put("/booking/:id",BookingController.updateBooking)
router.delete("/booking/:id",BookingController.deleteBooking)
router.get("/booking/pendingstatus/:id", BookingController.pendingStatusById);
router.get("/booking/donestatus/:id", BookingController.doneStatusById);
router.put('/booking/updateStatus/:id',BookingController.updateStatusById);
router.get('/user/booking/:id',BookingController.getBookingByUserId)
router.get('/serviceprovider/booking/:id',BookingController.getBookingByServiceProviderId)
router.get('/doneStatusByServiceProvider/:id',BookingController.doneStatusByServiceProviderId);

module.exports = router;