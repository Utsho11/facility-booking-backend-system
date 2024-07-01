import mongoose from 'mongoose';
import { TBooking } from './booking.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Booking } from './booking.model';
import { Facility } from '../facility/facility.model';
import { extractIdFromToken } from '../../utils/extractIdFromToken';
import { isTimeOverlap, parseTime } from '../../utils/isOverlapTime';

const createBookingIntoDB = async (payload: TBooking, tokenData: string) => {
  const facility = await Facility.findOne({
    _id: payload.facility,
    isDeleted: false,
  });

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
  const durationHours = (endDateTime - startDateTime) / 60;

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

  const newBooking = await Booking.create(payload);

  if (!newBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create booking.');
  }

  return newBooking;
};

const getAllBookingsforAdminFromDB = async () => {
  const result = await Booking.find().populate('facility').populate('user');
  return result;
};

const getAllBookingsforUserFromDB = async (id: string) => {
  const uid = await extractIdFromToken(id);

  const result = await Booking.find({ user: uid }).populate('facility');
  return result;
};

const deleteBookingFromDB = async (id: string, token: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const uid = await extractIdFromToken(token);
    const booking = await Booking.findById(id);

    if (!booking?.user.equals(uid)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You are not allowed to delete this booking.',
      );
    }

    const deletedBooking = await Booking.findByIdAndUpdate(
      id,
      { isBooked: 'canceled' },
      { new: true, session },
    );

    if (!deletedBooking) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete booking');
    }

    // get user _id from deletedAdmin

    await session.commitTransaction();
    await session.endSession();

    return deletedBooking.populate('facility');
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err as string);
  }
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsforAdminFromDB,
  getAllBookingsforUserFromDB,
  deleteBookingFromDB,
};
