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
router.get('/user',auth('user'),BookingControllers.getAllBookingsforUser)
router.delete('/:id',auth('user'),BookingControllers.deleteBooking)


export const BookingRoutes = router;
