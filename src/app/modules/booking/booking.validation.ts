import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    facility: z.string({
      message: 'Facility id is required',
    }),
    date: z.string().min(1, 'Date is required'),
    startTime: z.string().min(1, 'Start time is required'),
    endTime: z.string().min(1, 'End time is required'),
    isBooked: z
      .enum(['confirmed', 'unconfirmed', 'canceled'])
      .default('confirmed'),
  }),
});

export const BookingValidation = {
  createBookingValidationSchema,
};
