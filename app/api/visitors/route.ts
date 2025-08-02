import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
export const runtime = "edge";

// GET request
// total views for a specific slug ("/" in our case)
export async function GET() {
  const count = await redis.get("pageviews:projects:/");
  return NextResponse.json({ count });
}

// POST request
// increment view count each visit
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const slug = body.slug;
  if (!slug) return new NextResponse("Slug not found", { status: 400 });

  await redis.incr(`pageviews:projects:${slug}`);
  return new NextResponse(null, { status: 202 });
}
