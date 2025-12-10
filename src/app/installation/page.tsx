'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ClipboardDocumentIcon,
    CheckIcon,
    CodeBracketIcon,
    DocumentTextIcon
} from '@heroicons/react/24/outline';

export default function InstallationPage() {
    const [copied, setCopied] = useState<string | null>(null);
    const [tourId, setTourId] = useState('tour_abc123');

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const scriptCode = `<!-- Tour Widget Script -->
<script src="https://cdn.yourdomain.com/tour-widget.js"></script>
<script>
  TourWidget.init({
    tourId: '${tourId}',
    apiKey: 'your_api_key_here'
  });
</script>`;

    const npmInstall = `npm install @your-org/tour-widget`;

    const reactCode = `import { TourWidget } from '@your-org/tour-widget';
import '@your-org/tour-widget/dist/style.css';

function App() {
  return (
    <div>
      <TourWidget 
        tourId="${tourId}"
        apiKey="your_api_key_here"
      />
      {/* Your app content */}
    </div>
  );
}`;

    const vueCode = `<template>
  <div>
    <TourWidget 
      :tour-id="tourId"
      :api-key="apiKey"
    />
    <!-- Your app content -->
  </div>
</template>

<script>
import { TourWidget } from '@your-org/tour-widget';
import '@your-org/tour-widget/dist/style.css';

export default {
  components: { TourWidget },
  data() {
    return {
      tourId: '${tourId}',
      apiKey: 'your_api_key_here'
    }
  }
}
</script>`;

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Installation Guide</h1>
                <p className="mt-1 text-gray-500">
                    Get your tour widget up and running in minutes
                </p>
            </div>

            {/* Quick Start */}
            <Card>
                <CardHeader>
                    <CardTitle>Quick Start</CardTitle>
                    <CardDescription>The fastest way to add tours to your website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Your Tour ID</label>
                        <Input
                            value={tourId}
                            onChange={(e) => setTourId(e.target.value)}
                            placeholder="Enter your tour ID"
                        />
                        <p className="text-xs text-gray-500">
                            Find your tour ID in the dashboard under each tour&apos;s settings
                        </p>
                    </div>

                    <div className="relative">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{scriptCode}</code>
                        </pre>
                        <Button
                            size="sm"
                            variant="outline"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(scriptCode, 'script')}
                        >
                            {copied === 'script' ? (
                                <>
                                    <CheckIcon className="h-4 w-4 mr-1" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex gap-2">
                            <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div className="text-sm">
                                <p className="font-medium text-blue-900">Pro Tip</p>
                                <p className="text-blue-700">Place this script just before the closing &lt;/body&gt; tag for optimal performance.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Framework Integration */}
            <Card>
                <CardHeader>
                    <CardTitle>Framework Integration</CardTitle>
                    <CardDescription>Install using your preferred framework</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="react">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="react">React</TabsTrigger>
                            <TabsTrigger value="vue">Vue</TabsTrigger>
                            <TabsTrigger value="angular">Angular</TabsTrigger>
                        </TabsList>

                        <TabsContent value="react" className="space-y-4 mt-4">
                            <div>
                                <h4 className="text-sm font-medium mb-2">1. Install the package</h4>
                                <div className="relative">
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                        <code>{npmInstall}</code>
                                    </pre>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="absolute top-2 right-2"
                                        onClick={() => copyToClipboard(npmInstall, 'npm')}
                                    >
                                        {copied === 'npm' ? (
                                            <>
                                                <CheckIcon className="h-4 w-4 mr-1" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">2. Import and use the component</h4>
                                <div className="relative">
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                        <code>{reactCode}</code>
                                    </pre>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="absolute top-2 right-2"
                                        onClick={() => copyToClipboard(reactCode, 'react')}
                                    >
                                        {copied === 'react' ? (
                                            <>
                                                <CheckIcon className="h-4 w-4 mr-1" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="vue" className="space-y-4 mt-4">
                            <div>
                                <h4 className="text-sm font-medium mb-2">1. Install the package</h4>
                                <div className="relative">
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                        <code>{npmInstall}</code>
                                    </pre>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="absolute top-2 right-2"
                                        onClick={() => copyToClipboard(npmInstall, 'npm-vue')}
                                    >
                                        {copied === 'npm-vue' ? (
                                            <>
                                                <CheckIcon className="h-4 w-4 mr-1" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium mb-2">2. Import and use the component</h4>
                                <div className="relative">
                                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                                        <code>{vueCode}</code>
                                    </pre>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="absolute top-2 right-2"
                                        onClick={() => copyToClipboard(vueCode, 'vue')}
                                    >
                                        {copied === 'vue' ? (
                                            <>
                                                <CheckIcon className="h-4 w-4 mr-1" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <ClipboardDocumentIcon className="h-4 w-4 mr-1" />
                                                Copy
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="angular" className="space-y-4 mt-4">
                            <div className="text-center py-8 text-gray-500">
                                <CodeBracketIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>Angular integration coming soon!</p>
                                <p className="text-sm mt-1">Use the vanilla JavaScript method for now.</p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>

            {/* Configuration Options */}
            <Card>
                <CardHeader>
                    <CardTitle>Configuration Options</CardTitle>
                    <CardDescription>Customize the widget behavior</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-left py-3 px-4 font-medium">Option</th>
                                    <th className="text-left py-3 px-4 font-medium">Type</th>
                                    <th className="text-left py-3 px-4 font-medium">Default</th>
                                    <th className="text-left py-3 px-4 font-medium">Description</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-mono text-xs">tourId</td>
                                    <td className="py-3 px-4">string</td>
                                    <td className="py-3 px-4 font-mono text-xs">required</td>
                                    <td className="py-3 px-4">Unique identifier for your tour</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-mono text-xs">apiKey</td>
                                    <td className="py-3 px-4">string</td>
                                    <td className="py-3 px-4 font-mono text-xs">required</td>
                                    <td className="py-3 px-4">Your API key from the dashboard</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-mono text-xs">autoStart</td>
                                    <td className="py-3 px-4">boolean</td>
                                    <td className="py-3 px-4 font-mono text-xs">false</td>
                                    <td className="py-3 px-4">Automatically start tour on page load</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-mono text-xs">showAvatar</td>
                                    <td className="py-3 px-4">boolean</td>
                                    <td className="py-3 px-4 font-mono text-xs">true</td>
                                    <td className="py-3 px-4">Show 3D animated avatar</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-mono text-xs">position</td>
                                    <td className="py-3 px-4">string</td>
                                    <td className="py-3 px-4 font-mono text-xs">&apos;bottom-right&apos;</td>
                                    <td className="py-3 px-4">Widget position on screen</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-mono text-xs">primaryColor</td>
                                    <td className="py-3 px-4">string</td>
                                    <td className="py-3 px-4 font-mono text-xs">&apos;#4f46e5&apos;</td>
                                    <td className="py-3 px-4">Primary brand color</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="py-3 px-4 font-mono text-xs">onComplete</td>
                                    <td className="py-3 px-4">function</td>
                                    <td className="py-3 px-4 font-mono text-xs">null</td>
                                    <td className="py-3 px-4">Callback when tour is completed</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 font-mono text-xs">onSkip</td>
                                    <td className="py-3 px-4">function</td>
                                    <td className="py-3 px-4 font-mono text-xs">null</td>
                                    <td className="py-3 px-4">Callback when tour is skipped</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
                <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-4 hover:border-indigo-300 transition-colors">
                            <DocumentTextIcon className="h-8 w-8 text-indigo-600 mb-2" />
                            <h3 className="font-medium mb-1">View Documentation</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Explore advanced features and API reference
                            </p>
                            <Button variant="outline" size="sm" className="w-full">
                                Read Docs
                            </Button>
                        </div>

                        <div className="border rounded-lg p-4 hover:border-indigo-300 transition-colors">
                            <CodeBracketIcon className="h-8 w-8 text-indigo-600 mb-2" />
                            <h3 className="font-medium mb-1">Try Demo</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                See the widget in action with live examples
                            </p>
                            <Button variant="outline" size="sm" className="w-full">
                                View Demo
                            </Button>
                        </div>

                        <div className="border rounded-lg p-4 hover:border-indigo-300 transition-colors">
                            <svg className="h-8 w-8 text-indigo-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            <h3 className="font-medium mb-1">Get Support</h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Need help? Our team is here to assist
                            </p>
                            <Button variant="outline" size="sm" className="w-full">
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
