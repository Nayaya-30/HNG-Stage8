'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChevronLeftIcon,
  PlayIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { TourEditor, type TourFormData } from '@/components/dashboard/tour-editor';

export default function TourBuilderPage() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleSave = async (data: TourFormData) => {
    console.log("Saving tour:", data);

    // TODO → Replace with your real Convex mutation
    router.push('/dashboard/tours');
  };

  const handleCancel = () => {
    router.push('/dashboard/tours');
  };

  const copyEmbedCode = () => {
    const tourId = "tour_example"; // replace with actual ID from Convex

    const embedCode = `<script src="https://your-domain.com/tours/${tourId}.js" data-tour-id="${tourId}"></script>`;

    navigator.clipboard.writeText(embedCode);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 text-white">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            className="border-brand-gold/40 text-brand-gold hover:bg-brand-gold/10"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>

          <div>
            <h1 className="text-3xl font-bold text-brand-gold drop-shadow">
              Tour Builder
            </h1>
            <p className="text-white/60">
              Create and customize your interactive onboarding tours.
            </p>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={copyEmbedCode}
            className="border-brand-blue/50 text-brand-blue hover:bg-brand-blue/10"
          >
            <DocumentDuplicateIcon className="mr-2 h-4 w-4" />
            {copied ? 'Copied!' : 'Copy Embed Code'}
          </Button>

          <Button className="bg-brand-blue text-white hover:bg-brand-blue/80">
            <PlayIcon className="mr-2 h-4 w-4" />
            Preview Tour
          </Button>
        </div>
      </div>

      {/* BUILDER CARD */}
      <Card className="bg-brand-royal/20 border border-brand-royal/40 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="text-brand-gold text-xl font-semibold">
            Create New Tour
          </CardTitle>
        </CardHeader>

        <CardContent>
          <TourEditor
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </CardContent>
      </Card>
    </div>
  );
}
