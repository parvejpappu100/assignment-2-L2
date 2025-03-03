import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().min(1, 'Last name is required').trim(),
});

const userAddressValidationSchema = z.object({
  street: z.string().min(1, 'Street is required').trim(),
  city: z.string().min(1, 'City is required').trim(),
  country: z.string().min(1, 'Country is required').trim(),
});

const userOrdersValidationSchema = z.array(
  z.object({
    productName: z.string().min(1, 'Product name is required').trim(),
    price: z.number().min(0, 'Price must be a positive number'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
  })
);

export const userZodValidationSchema = z.object({
  userId: z.number().min(1, 'User ID is required'),
  username: z.string().min(1, 'Username is required').trim(),
  password: z.string().min(1, 'Password is required').trim(),
  fullName: userNameValidationSchema,
  age: z.number().min(1, 'Age is required'),
  email: z.string().email('Invalid email format'),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).min(1, 'At least one hobby is required'),
  address: userAddressValidationSchema,
  orders: userOrdersValidationSchema.optional(),
});


export default userZodValidationSchema;