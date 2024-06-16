import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;

  //   console.log({userData});

  const result = await BookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});

export const BookingControllers = { createBooking };
