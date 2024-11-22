"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  like?: number;
  is_new?: boolean;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [editID, setEditID] = useState<number | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const response = await fetch("/api/product");
    const data: Product[] = await response.json();
    setProducts(data);
  }

  async function addProduct() {
    const response = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, image_url: imageUrl }),
    });
    if (response.ok) {
      await fetchProducts();
      clearForm();
    }
  }

  async function editProduct(id: number) {
    const product = products.find((product) => product.id === id);
    if (product) {
      setEditID(id);
      setName(product.name);
      setPrice(product.price);
      setImageUrl(product.image_url);
    }
  }

  async function updateProduct() {
    await fetch(`/api/product`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editID, name, price, image_url: imageUrl }),
    });
    await fetchProducts();
    clearForm();
    setEditID(null);
  }

  async function deleteProduct(id: number) {
    await fetch(`/api/product`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchProducts();
  }

  const clearForm = () => {
    setName("");
    setPrice(0);
    setImageUrl("");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50">
      <h1 className="text-3xl mb-8 font-bold text-gray-800">Product List</h1>

      <ul className="flex justify-center gap-6 flex-wrap w-full">
        {products.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            image_url={item.image_url}
            onDelete={() => deleteProduct(item.id)}
            onEdit={() => editProduct(item.id)}
          />
        ))}
      </ul>

      <div className="mt-10 bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl mb-4 font-semibold">
          {editID === null ? "Add Product" : "Edit Product"}
        </h2>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-gray-300 w-full mb-3 p-2 rounded"
        />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border-2 border-gray-300 w-full mb-3 p-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border-2 border-gray-300 w-full mb-3 p-2 rounded"
        />
        <button
          className="w-full bg-blue-500 text-white p-3 rounded mt-4"
          onClick={editID === null ? addProduct : updateProduct}
        >
          {editID === null ? "Add Product" : "Update Product"}
        </button>
      </div>

      <Link href="/" className="mt-6 text-blue-600 hover:underline">
        Home
      </Link>
    </div>
  );
}

function ProductItem({
  id,
  name,
  price,
  image_url,
  onDelete,
  onEdit,
}: {
  id: number;
  name: string;
  price: number;
  image_url: string;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white w-64">
      <Link href={`/product/${id}`}>
        <img
          src={image_url}
          alt={name}
          className="h-64 w-full object-cover mb-2 rounded cursor-pointer"
        />
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-gray-600">${price}</p>
      </Link>
      <button
        className="bg-red-500 text-white p-2 mt-2 w-full rounded"
        onClick={onDelete}
      >
        Delete
      </button>
      <button
        className="bg-blue-500 text-white p-2 mt-2 w-full rounded"
        onClick={onEdit}
      >
        Edit
      </button>
    </div>
  );
}
