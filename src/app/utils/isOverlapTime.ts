import mongoose from 'mongoose';
import { Booking } from '../modules/booking/booking.model';

export const parseTime = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const isTimeOverlap = async (
  facilityId: mongoose.Types.ObjectId,
  date: string,
  startTime: string,
  endTime: string,
): Promise<boolean> => {
  const similarDateandFacility = await Booking.find({
    facility: facilityId,
    date: date,
    isBooked: 'confirmed',
  });

  const userStartTime = parseTime(startTime);
  const userEndTime = parseTime(startTime);

  for (const booking of similarDateandFacility) {
    const bookingStart = parseTime(booking.startTime);
    const bookingEnd = parseTime(booking.endTime);

    // console.log(bookingStart < userStartTime && bookingEnd > userStartTime);
    // console.log(bookingStart < userEndTime && bookingEnd > userEndTime);

    if (
      (bookingStart <= userStartTime && bookingEnd > userStartTime) ||
      (bookingStart < userEndTime && bookingEnd > userEndTime)
    ) {
      return true;
    }
  }
  return false;
};
