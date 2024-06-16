import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string({ message: 'Password is required' }),
    phone: z.string({ message: 'Phone is required' }),
    role: z.enum(['admin', 'user'], {
      message: "Role must be 'admin' or 'user'",
    }),
    address: z.string({ message: 'Address is required' }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
};
