import mongoose from 'mongoose';
import { TBooking } from './booking.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Booking } from './booking.model';
import { Facility } from '../facility/facility.model';
import { extractIdFromToken } from '../../utils/extractIdFromToken';

const createBookingIntoDB = async (payload: TBooking, tokenData: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const facility = await Facility.findById(payload.facility).session(session);

    if (!facility) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Facility does not exist!');
    }

    // Parsing startTime and endTime as date objects
    const date = new Date(payload.date);
    const [startHour, startMinute] = payload.startTime.split(':').map(Number);
    const [endHour, endMinute] = payload.endTime.split(':').map(Number);

    if (
      isNaN(startHour) ||
      isNaN(startMinute) ||
      isNaN(endHour) ||
      isNaN(endMinute)
    ) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Invalid start time or end time provided.',
      );
    }

    const startDateTime = new Date(date);
    startDateTime.setHours(startHour, startMinute, 0, 0);

    const endDateTime = new Date(date);
    endDateTime.setHours(endHour, endMinute, 0, 0);

    if (endDateTime <= startDateTime) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'End time must be after start time.',
      );
    }

    // Calculate the duration in hours
    const durationHours =
      (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

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
