import z from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2),
  email: z.email(),
  region: z.string().min(2),
  spent: z.number().min(0),
  active: z.boolean(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;
