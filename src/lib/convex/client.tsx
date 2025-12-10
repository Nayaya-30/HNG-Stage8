'use client';

import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { ReactNode } from 'react';

// In a real app, this would be set to your Convex deployment URL
const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL || 'http://localhost:8187'
);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
