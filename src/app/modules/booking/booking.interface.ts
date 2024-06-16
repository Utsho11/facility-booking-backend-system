import { Types } from 'mongoose';

export type TBooking = {
  facility: Types.ObjectId;
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  payableAmount: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
};

