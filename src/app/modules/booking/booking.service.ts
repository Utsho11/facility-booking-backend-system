import mongoose from "mongoose";
import { TBooking } from "./booking.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
  
      const newBooking = await Booking.create([payload], { session });
  
      if (!newBooking.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      return newBooking;
    } catch (err: any) {
      await session.abortTransaction();
      await session.endSession();
      throw new Error(err);
    }
  };

export const BookingServices = {
    createBookingIntoDB
}