import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
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
  paymentStatus: {
    type: String,
    enum: {
      values: ['paid', 'pending'],
      message: '{VALUE} is not valid',
    },
    default: 'pending',
  },
  transactionId: { type: String },
  isBooked: {
    type: String,
    enum: {
      values: ['confirmed', 'unconfirmed', 'canceled'],
      message: '{VALUE} is not valid',
    },
    default: 'unconfirmed',
  },
});

export const Booking = model<TBooking>('Bookings', bookingSchema);
