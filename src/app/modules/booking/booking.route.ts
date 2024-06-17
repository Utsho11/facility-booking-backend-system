import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { BookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';

const router = express.Router();


router.post(
  '/',
  auth('user'),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/',auth('admin'),BookingControllers.getAllBookingsforAdmin)


export const BookingRoutes = router;
