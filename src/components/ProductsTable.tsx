'use client';
import productsData from '@/data/products.json';
import React, { useState } from 'react';
import Modal from './Modal';
import { Product } from '@/types/product';

export default function ProductsTable() {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>();
  const [search, setSearch] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleEditOpen = (product: Product) => {
    setCurrentProduct(product);
    setIsEditOpen(true);
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!currentProduct) return;
    const updateProduct = {
      ...currentProduct,
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
    };

    setProducts(products.map((p) => (p.id === currentProduct.id ? updateProduct : p)));
    setIsEditOpen(false);
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newProduct = {
      id: Date.now(), // simple unique ID
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
      stock: Number(formData.get('stock')),
    };

    setProducts([...products, newProduct]);
    setIsAddOpen(false);
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-1/3"
        />
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
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">{p.price}</td>
              <td className="p-2">{p.stock}</td>
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
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="stock"
            placeholder="Stock"
            className="border p-2 rounded"
            required
          />
          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </form>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Product">
        {currentProduct && (
          <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
            <input
              type="text"
              name="name"
              placeholder="Product name"
              defaultValue={currentProduct.name}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              defaultValue={currentProduct.category}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              defaultValue={currentProduct.price}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="stock"
              placeholder="Stock"
              defaultValue={currentProduct.stock}
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
