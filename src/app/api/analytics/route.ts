import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, tourId, userId, analyticsId, stepId } = body || {};
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string;
    if (!convexUrl) return NextResponse.json({ error: "Missing Convex URL" }, { status: 500 });
    const client = new ConvexHttpClient(convexUrl);

    if (type === "start") {
      if (!tourId || !userId) return NextResponse.json({ error: "Missing tourId or userId" }, { status: 400 });
      const id = await client.mutation(api.analytics.startTour, { tourId, userId });
      return NextResponse.json({ analyticsId: id });
    }

    if (type === "step") {
      if (!analyticsId || !stepId) return NextResponse.json({ error: "Missing analyticsId or stepId" }, { status: 400 });
      await client.mutation(api.analytics.completeStep, { analyticsId, stepId });
      return NextResponse.json({ ok: true });
    }

    if (type === "complete") {
      if (!analyticsId) return NextResponse.json({ error: "Missing analyticsId" }, { status: 400 });
      await client.mutation(api.analytics.completeTour, { analyticsId });
      return NextResponse.json({ ok: true });
    }

    if (type === "abandon") {
      if (!analyticsId) return NextResponse.json({ error: "Missing analyticsId" }, { status: 400 });
      await client.mutation(api.analytics.abandonTour, { analyticsId });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown analytics type" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: "Analytics handler failed" }, { status: 500 });
  }
}
