const BookingController = require('../controller/BookingController');
const router = require('express').Router();
router.post("/booking", BookingController.createBooking);
router.get("/booking", BookingController.getBooking);
router.get("/booking/:id",BookingController.getBookingById)
router.put("/booking/:id",BookingController.updateBooking)
router.delete("/booking/:id",BookingController.deleteBooking)

module.exports = router;