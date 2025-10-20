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
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input {...register('name')} className="border p-2 rounded" placeholder="Name" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input {...register('email')} className="border p-2 rounded" placeholder="Email" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Region</label>
        <input {...register('region')} className="border p-2 rounded" placeholder="Region" />
        {errors.region && <p className="text-red-500 text-sm">{errors.region.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Total Spent ($)</label>
        <input
          type="number"
          {...register('spent', { valueAsNumber: true })}
          className="border p-2 rounded"
          placeholder="Spent"
        />
        {errors.spent && <p className="text-red-500 text-sm">{errors.spent.message}</p>}
      </div>
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('active')} />
        Active
      </label>
      <button type="submit" className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Save
      </button>
    </form>
  );
}
