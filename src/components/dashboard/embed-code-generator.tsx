'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  DocumentDuplicateIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface EmbedCodeGeneratorProps {
  tourId: string;
}

export function EmbedCodeGenerator({ tourId }: EmbedCodeGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [customDomain, setCustomDomain] = useState('');

  const embedCode = customDomain
    ? `<script src="${customDomain}/tours/${tourId}.js" data-tour-id="${tourId}"></script>`
    : `<script src="https://your-domain.com/tours/${tourId}.js" data-tour-id="${tourId}"></script>`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="custom-domain">Custom Domain (Optional)</Label>
        <Input
          id="custom-domain"
          value={customDomain}
          onChange={(e) => setCustomDomain(e.target.value)}
          placeholder="https://your-custom-domain.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="embed-code">Embed Code</Label>
        <div className="relative">
          <Textarea
            id="embed-code"
            value={embedCode}
            readOnly
            className="min-h-[100px]"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={copyToClipboard}
          >
            {copied ? (
              <CheckIcon className="h-4 w-4 text-green-500" />
            ) : (
              <DocumentDuplicateIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-gray-100 p-4">
        <h4 className="font-medium">How to use:</h4>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-600">
          <li>Copy the embed code above</li>
          <li>Paste it into the HTML of your website</li>
          <li>Place it just before the closing &lt;/body&gt; tag</li>
          <li>Your tour will automatically appear on your site</li>
        </ol>
      </div>
    </div>
  );
}