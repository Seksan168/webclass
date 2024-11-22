import { NextResponse } from "next/server";
import prisma from "@/app/utils/db";

// GET handler
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

// POST handler
export async function POST(req: Request) {
  const { name, price, image_url } = await req.json();
  const newProduct = await prisma.product.create({
    data: { name, price, image_url },
  });
  return NextResponse.json(newProduct, { status: 201 });
}

// PUT handler
export async function PUT(req: Request) {
  const { id, name, price, image_url } = await req.json();
  const updatedProduct = await prisma.product.update({
    where: { id },
    data: { name, price, image_url },
  });
  return NextResponse.json(updatedProduct);
}

// DELETE handler
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.product.delete({
    where: { id },
  });
  return NextResponse.json({}, { status: 204 });
}
