"use client";

import { useState } from "react";
import Link from "next/link";

const initialProducts = [
  {
    id: 1,
    name: "Fender Guitar",
    price: 300,
    image_url:
      "https://images.unsplash.com/photo-1520166012956-add9ba0835cb?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Product() {
  const [products, setProducts] = useState(initialProducts);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [editID, setEditID] = useState<number | null>(null);

  // Add a new product
  const addProduct = () => {
    const id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
    const newProduct = { id, name, price, image_url: imageUrl };
    setProducts([...products, newProduct]);
    clearForm();
  };

  // Edit product
  const editProduct = (id: number) => {
    const product = products.find((product) => product.id === id);
    if (product) {
      setEditID(id);
      setName(product.name);
      setPrice(product.price);
      setImageUrl(product.image_url);
    }
  };

  // Update an existing product
  const updateProduct = () => {
    setProducts(
      products.map((product) =>
        product.id === editID
          ? { ...product, name, price, image_url: imageUrl }
          : product
      )
    );
    clearForm();
    setEditID(null);
  };

  // Delete product
  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // Clear form fields
  const clearForm = () => {
    setName("");
    setPrice(0);
    setImageUrl("");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-8">Product List</h1>

      <ul className="flex justify-center gap-4 flex-wrap w-full">
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

      <div className="mt-10">
        <h2 className="text-2xl mb-4">
          {editID === null ? "Add Product" : "Edit Product"}
        </h2>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-black m-1 p-2 text-lg"
        />
        <br />
        <input
          type="number"
          placeholder="Product Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border-2 border-black m-1 p-2 text-lg"
        />
        <br />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border-2 border-black m-1 p-2 text-lg"
        />
        <br />
        <button
          className="border-2 border-black m-1 p-2"
          onClick={editID === null ? addProduct : updateProduct}
        >
          {editID === null ? "Add Product" : "Update Product"}
        </button>
      </div>

      <Link href="/">Home</Link>
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
    <div className="border p-4">
      <Link href={`/product/${id}`}>
        <img
          src={image_url}
          alt={name}
          className="h-64 w-full object-cover mb-2 cursor-pointer"
        />
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-500">${price}</p>
      </Link>
      <button className="bg-red-500 text-white p-2 m-2" onClick={onDelete}>
        Delete
      </button>
      <button className="bg-blue-500 text-white p-2 m-2" onClick={onEdit}>
        Edit
      </button>
    </div>
  );
}
