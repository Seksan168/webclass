// app/api/blog/route.js (for Next.js 13)
export async function GET() {
  const response = await fetch("https://api.vercel.app/blog");
  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
