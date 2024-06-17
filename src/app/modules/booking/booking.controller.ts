import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const bookingData = req.body;
  const tokenData = req.headers.authorization as string;

  const result = await BookingServices.createBookingIntoDB(
    bookingData,
    tokenData,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookingsforAdmin =  catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsforAdminFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});
const getAllBookingsforUser =  catchAsync(async (req, res) => {
  const tokenData = req.headers.authorization as string;
  const result = await BookingServices.getAllBookingsforUserFromDB(tokenData);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;

  const tokenData = req.headers.authorization as string;
  const result = await BookingServices.deleteBookingFromDB(id,tokenData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
})

export const BookingControllers = { createBooking,getAllBookingsforAdmin,getAllBookingsforUser,deleteBooking };
