import { Types } from 'mongoose';

export interface TBooking {
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  transactionId?: string;
  payableAmount: number;
  paymentStatus: 'paid' | 'pending';
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
}
