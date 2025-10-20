import z from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email'),
  region: z.string().min(2, 'Region is required'),
  spent: z.number().min(0, 'Spent must be positive'),
  active: z.boolean(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
