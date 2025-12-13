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

  const handleSave = (data: TourFormData) => {
    // In a real app, this would save to Convex
    console.log('Saving tour:', data);
    router.push('/dashboard/tours');
  };

  const handleCancel = () => {
    router.push('/dashboard/tours');
  };

  const copyEmbedCode = () => {
    // This would be the actual tour ID in a real app
    const tourId = 'tour_example';
    const embedCode = `<script src="https://guidetour.vercel.app/tours/${tourId}.js" data-tour-id="${tourId}"></script>`;
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={() => router.back()} className="bg-slate-950 border border-slate-700 text-white hover:bg-slate-800">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-brand-gold drop-shadow">Tour Builder</h1>
            <p className="text-white/60">
              Create and customize your product tour experience
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={copyEmbedCode} className="bg-slate-950 border border-slate-700 text-white hover:bg-slate-800">
            <DocumentDuplicateIcon className="mr-2 h-4 w-4" />
            {copied ? 'Copied!' : 'Copy Embed Code'}
          </Button>
          <Button className="bg-brand-blue/60 hover:bg-brand-blue text-white">
            <PlayIcon className="mr-2 h-4 w-4" />
            Preview Tour
          </Button>
        </div>
      </div>

      <Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-brand-gold">Create New Tour</CardTitle>
        </CardHeader>
        <CardContent>
          <TourEditor onSave={handleSave} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  );
}
