import { Customer } from '@/types/customer';
import { useForm } from 'react-hook-form';
import { customerSchema, CustomerFormData } from '@/types/customerSchema';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  customer?: Customer;
  onSubmit: (data: Partial<Customer>) => void;
}

export default function CustomerForm({ customer, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: customer ?? { name: '', email: '', region: '', spent: 0, active: true },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input {...register('name')} className="border p-2 rounded" placeholder="Name" />
      <input {...register('email')} className="border p-2 rounded" placeholder="Email" />
      <input {...register('region')} className="border p-2 rounded" placeholder="Region" />
      <input
        type="number"
        {...register('spent', { valueAsNumber: true })}
        className="border p-2 rounded"
        placeholder="Spent"
      />
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('active')} />
        Active
      </label>
      <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
        Save
      </button>
    </form>
  );
}
