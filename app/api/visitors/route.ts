import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();
export const runtime = "edge";

// fetch total amount of visits
export async function GET() {
  const count = await redis.get("pageviews:projects:/");
  return NextResponse.json({ count });
}

// increment viewer count each visit
export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  const slug = body.slug;
  if (!slug) return new NextResponse("Slug not found", { status: 400 });

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ||
    req.ip ||
    "unknown";

  // hash the IP to avoid saving it in plain text
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(ip)
  );
  const hash = Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");

  const isNew = await redis.set(
    [`deduplicate`, hash, slug].join(":"),
    true,
    { nx: true, ex: 86400 } // 1-day deduplication
  );

  if (!isNew) return new NextResponse(null, { status: 202 });

  // add date to the Redis key
  const date = new Date().toISOString().slice(0, 10); 
  await redis.incr(["pageviews", "projects", slug, date].join(":"));


  return new NextResponse(null, { status: 202 });
}
