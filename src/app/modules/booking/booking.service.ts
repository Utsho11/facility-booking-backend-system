import mongoose from 'mongoose';
import { TBooking } from './booking.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Booking } from './booking.model';
import { Facility } from '../facility/facility.model';
import { extractIdFromToken } from '../../utils/extractIdFromToken';
import { isTimeOverlap, parseTime } from '../../utils/isOverlapTime';

const createBookingIntoDB = async (payload: TBooking, tokenData: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const facility = await Facility.findById(payload.facility).session(session);

    if (!facility) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Facility does not exist!');
    }

    const res = await isTimeOverlap(
      payload.facility,
      payload.date,
      payload.startTime,
      payload.endTime,
    );

    if (res) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'This slot is already occupied!',
      );
    }

    const startDateTime = parseTime(payload.startTime);

    const endDateTime = parseTime(payload.endTime);

    if (endDateTime <= startDateTime) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'End time must be after start time.',
      );
    }

    // Calculate the duration in hours
    const durationHours = (endDateTime - startDateTime)/60;

    const payableAmount = durationHours * facility.pricePerHour;

    if (isNaN(payableAmount)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Calculated payable amount is not a valid number.',
      );
    }

    const uid = await extractIdFromToken(tokenData);

    payload.payableAmount = payableAmount;
    payload.user = new mongoose.Types.ObjectId(uid); // Ensure the ID is of ObjectId type

    const newBooking = await Booking.create([payload], { session });

    if (!newBooking.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking.');
    }

    await session.commitTransaction();
    return newBooking;
  } catch (err: any) {
    await session.abortTransaction();
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      err.message || 'An error occurred during the booking creation process.',
    );
  } finally {
    session.endSession();
  }
};

export const BookingServices = {
  createBookingIntoDB,
};
