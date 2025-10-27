'use client';
import productsData from '@/data/products.json';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import { Product } from '@/types/product';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { v4 as uuidv4 } from 'uuid';

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem('products');
    return stored ? JSON.parse(stored) : productsData;
  });
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>();
  const [search, setSearch] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory == 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditOpen = (product: Product) => {
    setCurrentProduct(product);
    resetEditForm(product);
    setIsEditOpen(true);
  };

  const productSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    category: z.string().min(2, 'Category is required'),
    price: z.number().min(1, 'Price must be at least 1').max(10000, 'Price too high'),
    stock: z.number().min(0, 'Stock cannot be negative').max(1000, 'Stock too high'),
  });

  type ProductFormData = z.infer<typeof productSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    formState: { errors: editErrors },
    reset: resetEditForm,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  return (
    <div className="bg-white shadow rounded p-4 dark:bg-gray-600">
      <div className="mb-4 flex justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-1/3"
        />
        <select
          value={selectedCategory}
          className="border rounded p-2"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Shoes">Shoes</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Product List</h2>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => setIsAddOpen(true)}
        >
          + Add Product
        </button>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 text-left dark:bg-gray-800">
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p, index) => (
            <tr
              key={p.id}
              className={
                index % 2 == 0
                  ? 'bg-gray-50 border-t dark:bg-gray-400'
                  : 'bg-white border-t dark:bg-gray-200'
              }
            >
              <td className="p-2">{p.name}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-full text-white text-sm ${
                    p.category === 'Clothing'
                      ? 'bg-blue-500'
                      : p.category === 'Shoes'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                  }`}
                >
                  {p.category}
                </span>
              </td>

              <td className="p-2">{p.price}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded-full text-white text-sm ${
                    p.stock === 0 ? 'bg-red-500' : p.stock < 20 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                >
                  {p.stock === 0 ? 'Out of Stock' : p.stock < 20 ? 'Low Stock' : 'In Stock'}
                </span>
              </td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditOpen(p)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Product">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((data) => {
            const newProduct: Product = {
              id: Date.now(),
              ...data,
            };
            setProducts([...products, newProduct]);
            setIsAddOpen(false);
          })}
        >
          <input
            {...register('name')}
            type="text"
            name="name"
            placeholder="Product name"
            className="border p-2 rounded"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <input
            {...register('category')}
            type="text"
            name="category"
            placeholder="Category"
            className="border p-2 rounded"
            required
          />
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}

          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
            name="price"
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

          <input
            {...register('stock', { valueAsNumber: true })}
            type="text"
            name="stock"
            placeholder="Stock"
            className="border p-2 rounded"
            required
          />
          {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}

          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </form>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Product">
        {currentProduct && (
          <form
            className="flex flex-col gap-4"
            onSubmit={handleEditSubmit((data) => {
              const updatedProduct: Product = {
                ...currentProduct,
                ...data,
              };
              setProducts(products.map((p) => (p.id === currentProduct.id ? updatedProduct : p)));
              setIsEditOpen(false);
            })}
          >
            <input
              {...registerEdit('name')}
              type="text"
              name="name"
              placeholder="Product name"
              className="border p-2 rounded"
              required
            />
            {editErrors.name && <p className="text-red-500 text-sm">{editErrors.name.message}</p>}
            <input
              {...registerEdit('category')}
              type="text"
              name="category"
              placeholder="Category"
              className="border p-2 rounded"
              required
            />
            {editErrors.category && (
              <p className="text-red-500 text-sm">{editErrors.category.message}</p>
            )}

            <input
              {...registerEdit('price')}
              type="number"
              name="price"
              placeholder="Price"
              className="border p-2 rounded"
              required
            />
            {editErrors.price && <p className="text-red-500 text-sm">{editErrors.price.message}</p>}

            <input
              {...registerEdit('stock')}
              type="text"
              name="stock"
              placeholder="Stock"
              className="border p-2 rounded"
              required
            />

            <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
              Update
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
