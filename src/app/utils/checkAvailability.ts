import httpStatus from "http-status";
import catchAsync from "./catchAsync";
import sendResponse from "./sendResponse";
import { Booking } from "../modules/booking/booking.model";

interface TimeSlot {
    startTime: string;
    endTime: string;
  }

const checkAvailability =  catchAsync(async (req, res) => {
    const dateQuery = req.query.date as string;
    const date = dateQuery ? new Date(dateQuery) : new Date();
    const formattedDate = date.toISOString().split('T')[0];
  
    // Retrieve bookings for the specified date
    const bookings = await Booking.find({ date: formattedDate });
  
    // Define the full day's time range
    const fullDay = [
      { startTime: '08:00', endTime: '20:00' }
    ];
  
    // Calculate available slots
    const calculateAvailableSlots = (bookings: any[]): TimeSlot[] => {
      const bookedSlots = bookings.map(booking => ({
        startTime: booking.startTime,
        endTime: booking.endTime
      }));
  
      let availableSlots: TimeSlot[] = [];
  
      fullDay.forEach(slot => {
        let { startTime, endTime } = slot;
        bookedSlots.forEach(booked => {
          if (booked.startTime >= startTime && booked.startTime < endTime) {
            if (startTime < booked.startTime) {
              availableSlots.push({ startTime, endTime: booked.startTime });
            }
            startTime = booked.endTime;
          }
        });
        if (startTime < endTime) {
          availableSlots.push({ startTime, endTime });
        }
      });
  
      return availableSlots;
    };
  
    const availableSlots = calculateAvailableSlots(bookings);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Bookings retrieved successfully',
      data: availableSlots,
    });
  });



export default checkAvailability;
