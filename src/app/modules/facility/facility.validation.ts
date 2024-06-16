import { z } from 'zod';

const createFacilityValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    pricePerHour: z
      .number()
      .nonnegative({ message: 'Price per hour must be a positive number' }),
    location: z.string().min(1, { message: 'Location is required' }),
    isDeleted: z.boolean().optional().default(false),
  }),
});

export const FacilityValidations = {
  createFacilityValidationSchema,
};
