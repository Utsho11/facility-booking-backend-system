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
    toJSON: {
      transform: function (doc, ret) {
        return {
          _id: ret._id,
          facility: ret.facility,
          date: ret.date,
          startTime: ret.startTime,
          endTime: ret.endTime,
          user: ret.user,
          payableAmount: ret.payableAmount,
          isBooked: ret.isBooked,
        };
      },
    },
  },
);

export const Booking = model<TBooking>('Bookings', bookingSchema);
