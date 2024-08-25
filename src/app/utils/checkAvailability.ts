import httpStatus from 'http-status';
import catchAsync from './catchAsync';
import sendResponse from './sendResponse';
import { Booking } from '../modules/booking/booking.model';

interface TimeSlot {
  startTime: string;
  endTime: string;
}

const checkAvailability = catchAsync(async (req, res) => {
  // console.log(req.query);

  const dateQuery = req?.query?.date as string;
  const facilityQuery = req?.query?.facility;
  const date = dateQuery ? new Date(dateQuery) : new Date();
  const formattedDate = date.toISOString().split('T')[0];

  // Retrieve bookings for the specified date and sort by start time in ascending order
  const bookings = await Booking.find({
    date: formattedDate,
    facility: facilityQuery,
  })
    .sort('startTime')
    .sort('endTime');

  // console.log(bookings);

  // Function to convert time string to minutes
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Calculate available slots
  const calculateAvailableSlots = (bookings: TimeSlot[]): TimeSlot[] => {
    const availableSlots: TimeSlot[] = [];
    let lastEndTime = '08:00';

    bookings.forEach((booking) => {
      const { startTime, endTime } = booking;

      if (
        timeToMinutes(startTime) > timeToMinutes(lastEndTime) &&
        timeToMinutes(startTime) - timeToMinutes(lastEndTime) > 0
      ) {
        availableSlots.push({
          startTime: lastEndTime,
          endTime: startTime,
        });
        lastEndTime = endTime;
      }
      if (timeToMinutes(endTime) > timeToMinutes(lastEndTime)) {
        lastEndTime = endTime;
      }
    });

    if (timeToMinutes(lastEndTime) < timeToMinutes('20:00')) {
      availableSlots.push({
        startTime: lastEndTime,
        endTime: '20:00',
      });
    }

    return availableSlots;
  };

  const availableSlots = calculateAvailableSlots(bookings);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: availableSlots,
  });
});

export default checkAvailability;
