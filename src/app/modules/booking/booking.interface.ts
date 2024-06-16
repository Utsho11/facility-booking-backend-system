import { Types } from 'mongoose';

export interface TBooking {
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  payableAmount: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
}
