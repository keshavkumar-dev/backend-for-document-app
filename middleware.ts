import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://collaborative-document-ed-git-5faa1e-keshavbrcsm-58.vercel.app",
];

function corsHeaders(origin: string | null) {
  const headers = new Headers()

  // Agar origin match hota hai wahi bhejo, warna pehla wala default allow kar do
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) 
    ? origin 
    : ALLOWED_ORIGINS[2]; // Yeh aapka live Vercel URL hai

  headers.set("Access-Control-Allow-Origin", allowedOrigin)
  headers.set("Access-Control-Allow-Credentials", "true")
  headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS")
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

  return headers
}

export function middleware(req: NextRequest) {
  const origin = req.headers.get("origin")

  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders(origin),
    })
  }

  const response = NextResponse.next()
  const headers = corsHeaders(origin)
  headers.forEach((value, key) => response.headers.set(key, value))

  return response
}

export const config = {
  matcher: "/api/:path*",
}
