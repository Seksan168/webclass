"use client";

import { useEffect, useState } from "react";

type ProductType = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: string;
};

type PhotoType = {
  id: number;
  title: string;
  url: string;
};

export default function Page() {
  const [posts, setPosts] = useState<ProductType[]>([]);
  const [photos, setPhotos] = useState<PhotoType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch posts from your Vercel API
        const postsResponse = await fetch(
          "https://dummyjson.com/products?limit=10&select=title,price"
        );
        if (!postsResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const postsData = await postsResponse.json();
        setPosts(postsData);

        // Fetch titles from the Typicode API
        const photosResponse = await fetch(
          "https://jsonplaceholder.typicode.com/photos"
        );
        const photosData = await photosResponse.json();
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    fetchData();
  }, []);

  // Combine posts with titles
  const combinedData = posts.map((post, index) => ({
    ...post,
    title: photos[index]?.title || "No Title", // Use the title or a default value
  }));

  if (!posts.length || !photos.length) {
    return <div className="text-center">...loading!!</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      <hr className="mb-4" />

      {combinedData.map((post) => (
        <div
          key={post.id}
          className="p-4 border rounded-lg shadow-lg bg-white mb-4"
        >
          <p className="text-gray-800">
            <strong>Title:</strong> {post.title}
          </p>
          <p className="text-gray-800">
            <strong>Author:</strong> {post.author}
          </p>
          <p className="text-gray-800">
            <strong>Content:</strong> {post.content}
          </p>
          <p className="text-gray-500">
            <strong>Date:</strong> {new Date(post.date).toLocaleDateString()}
          </p>
          <p className="text-gray-500">
            <strong>Category:</strong> {post.category}
          </p>
        </div>
      ))}
    </div>
  );
}
