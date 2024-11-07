"use client";

import { useEffect, useState } from "react";

type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
};
type CategoryType = {
  name: string;
};

export default function Page() {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [category, setCategory] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const URL_PRODUCT = "https://dummyjson.com/products";
        const response = await fetch(URL_PRODUCT);
        const productData = await response.json();
        setProduct(productData.products);
        console.log("Data: ", productData);
        const URL_CATEGORY = "https://dummyjson.com/products/categories";
        const responseCategory = await fetch(URL_CATEGORY);
        const categoryData = await responseCategory.json();
        setCategory(categoryData.categories);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  if (!product.length) {
    return <div className="text-center">...loading!!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="flex justify-center text-2xl font-bold mb-4">
        Product List 2024
      </h1>
      <hr className="mb-4" />
      <div className="flex justify-between">
        <div className="text-2xl font-bold mb-4">
          <div className="text-md font-bold mb-4">Add new category</div>
          <div>
            <button> Add</button>
          </div>
          Category
          <div>
            {/* {category.map((category: CategoryType) => (
              <div
                key={category.name}
                className="p-4 border rounded-lg shadow-lg bg-white mb-4"
              >
                <p className="text-gray-800">
                  <strong>Category:</strong> {category.name}
                </p>
              </div>
            ))} */}
          </div>
        </div>
        <div>
          Product
          <div>
            {product.map((product: ProductType) => (
              <p className="text-gray-800">
                <div className="bg-indigo-200 rounded-md border-2 border-black flex justify-between">
                  <div>{product.title}</div>
                  <div>${product.price.toFixed(2)}</div>
                  <div>{product.id} </div>
                </div>
              </p>
            ))}
          </div>
        </div>
      </div>

      {product.map((product: ProductType) => (
        <div
          key={product.id}
          className="p-4 border rounded-lg shadow-lg bg-white mb-4"
        >
          <p className="text-gray-800">
            <strong>Title:</strong> {product.title}
          </p>
          <p className="text-gray-800">
            <strong>Description:</strong> {product.description}
          </p>
          <p className="text-gray-500">
            <strong>Category:</strong> {product.category}
          </p>
          <p className="text-gray-800">
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>
        </div>
      ))}
    </div>
  );
}
