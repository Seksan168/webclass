import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

let products = [
  { id: 1, name: "Product 1", price: 100, image_url: "image1.jpg" },
  { id: 2, name: "Product 2", price: 200, image_url: "image2.jpg" },
];

// PUT handler for updating a product
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { name, price, image_url } = await req.json();
  const index = products.findIndex(
    (product) => product.id === Number(params.id)
  );
  if (index !== -1) {
    products[index] = { ...products[index], name, price, image_url };
    return NextResponse.json(products[index]);
  } else {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }
}

// DELETE handler for deleting a product
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  products = products.filter((product) => product.id !== Number(params.id));
  return NextResponse.json({}, { status: 204 });
}
