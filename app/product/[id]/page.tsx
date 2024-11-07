"use client"; // This marks the component as a Client Component

import CC from "@/components/cc";
import { useEffect, useState } from "react";

// Dummy products data
const products = [
  {
    id: 1,
    name: "Fender Guitar",
    price: 300,
    image_url:
      "https://images.unsplash.com/photo-1520166012956-add9ba0835cb?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Gibson Les Paul",
    price: 1200,
    image_url:
      "https://images.unsplash.com/photo-1559466170-d854d05cb115?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Fender Guitar",
    price: 300,
    image_url:
      "https://images.unsplash.com/photo-1520166012956-add9ba0835cb?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    like: 20,
    is_new: true,
  },
  {
    id: 6,
    name: "Gibson Les Paul",
    price: 1200,
    image_url:
      "https://images.unsplash.com/photo-1559466170-d854d05cb115?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    like: 50,
    is_new: true,
  },
  {
    id: 7,
    name: "Ibanez Bass Guitar",
    price: 600,
    image_url:
      "https://images.unsplash.com/photo-1485278537138-4e8911a13c02?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    like: 25,
    is_new: false,
  },
  {
    id: 8,
    name: "Roland Drum Set",
    price: 800,
    image_url:
      "https://plus.unsplash.com/premium_photo-1682855223543-2427fec5ec3d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    like: 40,
    is_new: true,
  },
  {
    id: 9,
    name: "Taylor Acoustic Guitar",
    price: 700,
    image_url:
      "https://images.unsplash.com/photo-1589390511985-aeacd8815121?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    like: 65,
    is_new: false,
  },
];

// Component for the Product Details page
export default function ProductDetails({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const [product, setProduct] = useState<any>(null);

  // Find the product based on dynamic route `id`
  useEffect(() => {
    const foundProduct = products.find(
      (product) => product.id === Number(params.id)
    );
    setProduct(foundProduct);
  }, [params.id]);

  // Loading state when product is not yet found
  if (!product) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-3xl mb-8">Loading...</h1>
      </div>
    );
  }

  // Product details display
  return (
    <div className="flex flex-col items-center">
      {/* Display the product information */}
      <h1 className="text-3xl mb-8">{product.name}</h1>
      <img
        src={product.image_url}
        alt={product.name}
        className="h-64 w-full object-cover mb-4"
      />
      <p className="text-xl mb-4">Price: ${product.price}</p>

      {/* CC Component */}
      <hr />
      <p>CC Component:</p>
      <CC />
      <hr />

      {/* Display Query String Parameters */}
      <p>QueryString:</p>
      <p>SearchParams: {JSON.stringify(searchParams)}</p>
      <p>Guitar: {searchParams.guitar}</p>

      {/* Back to Product List */}
      <a href="/product" className="text-blue-500">
        Back to Product List
      </a>
    </div>
  );
}
