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
    isBooked: { $ne: 'canceled' },
  });

  const userStartTime = parseTime(startTime);
  const userEndTime = parseTime(endTime);

  for (const booking of similarDateandFacility) {
    const bookingStart = parseTime(booking.startTime);
    const bookingEnd = parseTime(booking.endTime);

    // Standard interval overlap condition: A.start < B.end && A.end > B.start
    if (userStartTime < bookingEnd && userEndTime > bookingStart) {
      return true;
    }
  }
  return false;
};
