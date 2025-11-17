// app/api/gift-product/route.ts (Server-side code)
import { NextResponse } from 'next/server';
// Ensure this import is safe and the file is in server-only logic
import { getProducts } from "@/lib/getProducts"; 

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');

  if (!productId) {
    return NextResponse.json({ error: "Missing productId" }, { status: 400 });
  }

  try {
    // This server code executes safely during the build/runtime.
    const products = await getProducts(); 
    const giftProduct = products.find(p => p.id === Number(productId));

    if (!giftProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ data: giftProduct });
  } catch (error) {
    console.error("Error fetching gift product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}