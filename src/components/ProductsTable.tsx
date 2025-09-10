'use client';
import productsData from '@/data/products.json';
import { useState } from 'react';

export default function ProductsTable() {
  const [products, setProducts] = useState(productsData);
  const handleDelete = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };
  const [search, setSearch] = useState('');
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded p-2 w-1/3"
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Product List</h2>
        <button
          className="bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => alert('TODO: open add product modal')}
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
                  onClick={() => alert('TODO: Edit Modal')}
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
    </div>
  );
}
