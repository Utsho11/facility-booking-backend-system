import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    facility: {
      type: Schema.Types.ObjectId,
      required: [true, 'Facility is required'],
      ref: 'Facility',
    },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    payableAmount: { type: Number },
    isBooked: {
      type: String,
      enum: {
        values: ['confirmed', 'unconfirmed', 'canceled'],
        message: '{VALUE} is not valid',
      },
      default: 'confirmed',
    },
  },
  {
    collection: 'Bookings',
  },
);

export const Booking = model<TBooking>('Bookings', bookingSchema);
