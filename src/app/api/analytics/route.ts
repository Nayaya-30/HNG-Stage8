// ./src/app/api/analytics/route.ts
import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

// Assuming client body now sends: type, tourId, userId, analyticsId (sessionId), stepId, stepOrder, eventType
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Deconstruct fields, now including new required fields for step tracking
    const { 
        type, 
        tourId, 
        userId, 
        analyticsId, // This is the sessionId
        stepId, 
        stepOrder, 
        eventType, 
        timeOnStep 
    } = body || {};
    
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL as string;
    if (!convexUrl) return NextResponse.json({ error: "Missing Convex URL" }, { status: 500 });
    const client = new ConvexHttpClient(convexUrl);

    if (type === "start") {
      if (!tourId) return NextResponse.json({ error: "Missing tourId" }, { status: 400 });
      
      // FIX 1: Function name is correct: startSession
      const id = await client.mutation(api.analytics.startSession, { 
          tourId,
          userId, 
          // NOTE: In a real app, these should be collected from the client/headers
          userAgent: req.headers.get("user-agent") || "unknown", 
          browser: "PlaceholderBrowser",
          device: "PlaceholderDevice",
          os: "PlaceholderOS",
          screenResolution: "1920x1080",
          pageUrl: body.pageUrl || "https://placeholder.com", 
      });
      return NextResponse.json({ analyticsId: id }); 
    }

    if (type === "step") {
      if (!analyticsId || !stepId || !stepOrder || !eventType) {
          return NextResponse.json({ error: "Missing required step analytics data" }, { status: 400 });
      }
      
      // FIX 2: Rename completeStep to recordStepEvent
      await client.mutation(api.analytics.recordStepEvent, { 
          sessionId: analyticsId, 
          stepId, 
          stepOrder, 
          eventType, 
          timeOnStep, // Optional, can be undefined
      });
      
      return NextResponse.json({ ok: true });
    }

    if (type === "complete") {
      if (!analyticsId) return NextResponse.json({ error: "Missing analyticsId" }, { status: 400 });
      
      // FIX 3: Update argument name to sessionId
      await client.mutation(api.analytics.completeTour, { sessionId: analyticsId });
      
      return NextResponse.json({ ok: true });
    }

    if (type === "abandon") {
      if (!analyticsId) return NextResponse.json({ error: "Missing analyticsId" }, { status: 400 });
      
      // FIX 4: Update argument name to sessionId
      await client.mutation(api.analytics.abandonTour, { sessionId: analyticsId });
      
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Unknown analytics type" }, { status: 400 });
  } catch (e) {
    console.error("Analytics handler failed:", e);
    return NextResponse.json({ error: "Analytics handler failed" }, { status: 500 });
  }
}
