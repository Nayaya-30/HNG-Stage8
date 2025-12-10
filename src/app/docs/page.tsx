"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ClipboardDocumentIcon,
  CheckIcon,
  CodeBracketIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function DocsPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [tourId, setTourId] = useState("tour_abc123");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const scriptCode = `<!-- OnboardX Tour Widget -->
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
    <main className="min-h-screen bg-[#040816] text-slate-50 px-6 md:px-10 lg:px-16 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-400 uppercase">
            Documentation
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold">
            OnboardX Installation Guide
          </h1>
          <p className="text-sm text-slate-400 max-w-xl">
            Learn how to embed the OnboardX tour widget into your product — using a
            simple script tag or framework components.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle>Quick Start</CardTitle>
            <p className="text-sm text-slate-400">
              The fastest way to add tours to your website
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200">
                Your Tour ID
              </label>
              <Input
                value={tourId}
                onChange={(e) => setTourId(e.target.value)}
                placeholder="Enter your tour ID"
                className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-500">
                Find your tour ID in the OnboardX dashboard under each tour’s settings.
              </p>
            </div>

            <div className="relative">
              <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-800">
                <code>{scriptCode}</code>
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2 border-slate-600 text-slate-100 hover:bg-slate-800"
                onClick={() => copyToClipboard(scriptCode, "script")}
              >
                {copied === "script" ? (
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

            <div className="bg-sky-950/60 border border-sky-500/40 rounded-lg p-4">
              <div className="flex gap-2">
                <svg
                  className="w-5 h-5 text-sky-400 shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-sm">
                  <p className="font-medium text-sky-100">Pro Tip</p>
                  <p className="text-sky-200/80">
                    Place this script just before the closing &lt;/body&gt; tag for optimal
                    performance.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Framework Integration */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle>Framework Integration</CardTitle>
            <p className="text-sm text-slate-400">
              Install using your preferred framework
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="react">
              <TabsList className="grid w-full grid-cols-3 bg-slate-900 border border-slate-800">
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="vue">Vue</TabsTrigger>
                <TabsTrigger value="angular">Angular</TabsTrigger>
              </TabsList>

              {/* React */}
              <TabsContent value="react" className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    1. Install the package
                  </h4>
                  <div className="relative">
                    <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-800">
                      <code>{npmInstall}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 border-slate-600 text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(npmInstall, "npm")}
                    >
                      {copied === "npm" ? (
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
                  <h4 className="text-sm font-medium mb-2">
                    2. Import and use the component
                  </h4>
                  <div className="relative">
                    <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-800">
                      <code>{reactCode}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 border-slate-600 text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(reactCode, "react")}
                    >
                      {copied === "react" ? (
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

              {/* Vue */}
              <TabsContent value="vue" className="space-y-4 mt-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">
                    1. Install the package
                  </h4>
                  <div className="relative">
                    <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-800">
                      <code>{npmInstall}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 border-slate-600 text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(npmInstall, "npm-vue")}
                    >
                      {copied === "npm-vue" ? (
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
                  <h4 className="text-sm font-medium mb-2">
                    2. Import and use the component
                  </h4>
                  <div className="relative">
                    <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-800">
                      <code>{vueCode}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 border-slate-600 text-slate-100 hover:bg-slate-800"
                      onClick={() => copyToClipboard(vueCode, "vue")}
                    >
                      {copied === "vue" ? (
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

              {/* Angular */}
              <TabsContent value="angular" className="space-y-4 mt-4">
                <div className="text-center py-8 text-slate-400">
                  <CodeBracketIcon className="h-12 w-12 mx-auto mb-2 opacity-60" />
                  <p>Angular integration coming soon.</p>
                  <p className="text-sm mt-1">
                    For now, use the vanilla JavaScript script tag method.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Configuration Options */}
        <Card className="border-slate-800 bg-slate-900/60">
          <CardHeader>
            <CardTitle>Configuration Options</CardTitle>
            <p className="text-sm text-slate-400">
              Customize the widget behavior
            </p>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-300">
                    <th className="text-left py-3 px-4 font-medium">
                      Option
                    </th>
                    <th className="text-left py-3 px-4 font-medium">Type</th>
                    <th className="text-left py-3 px-4 font-medium">
                      Default
                    </th>
                    <th className="text-left py-3 px-4 font-medium">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-xs">tourId</td>
                    <td className="py-3 px-4">string</td>
                    <td className="py-3 px-4 font-mono text-xs">required</td>
                    <td className="py-3 px-4">
                      Unique identifier for your tour
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-xs">apiKey</td>
                    <td className="py-3 px-4">string</td>
                    <td className="py-3 px-4 font-mono text-xs">required</td>
                    <td className="py-3 px-4">
                      Your API key from the dashboard
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-xs">autoStart</td>
                    <td className="py-3 px-4">boolean</td>
                    <td className="py-3 px-4 font-mono text-xs">false</td>
                    <td className="py-3 px-4">
                      Automatically start tour on page load
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-xs">showAvatar</td>
                    <td className="py-3 px-4">boolean</td>
                    <td className="py-3 px-4 font-mono text-xs">true</td>
                    <td className="py-3 px-4">
                      Show 3D animated avatar in the widget
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-xs">position</td>
                    <td className="py-3 px-4">string</td>
                    <td className="py-3 px-4 font-mono text-xs">
                      &apos;bottom-right&apos;
                    </td>
                    <td className="py-3 px-4">
                      Widget position on screen
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-xs">
                      primaryColor
                    </td>
                    <td className="py-3 px-4">string</td>
                    <td className="py-3 px-4 font-mono text-xs">
                      &apos;#4f46e5&apos;
                    </td>
                    <td className="py-3 px-4">
                      Primary brand color used in the widget
                    </td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-3 px-4 font-mono text-xs">
                      onComplete
                    </td>
                    <td className="py-3 px-4">function</td>
                    <td className="py-3 px-4 font-mono text-xs">null</td>
                    <td className="py-3 px-4">
                      Callback fired when tour is completed
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-mono text-xs">onSkip</td>
                    <td className="py-3 px-4">function</td>
                    <td className="py-3 px-4 font-mono text-xs">null</td>
                    <td className="py-3 px-4">
                      Callback fired when tour is skipped
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="border-slate-800 bg-slate-900/60 mb-10">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <p className="text-sm text-slate-400">
              Where to go after installation
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-slate-800 rounded-lg p-4 hover:border-amber-300/70 transition-colors">
                <DocumentTextIcon className="h-8 w-8 text-amber-300 mb-2" />
                <h3 className="font-medium mb-1 text-slate-100">
                  View Documentation
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  Explore advanced features, events and API reference.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-700"
                >
                  Read Docs
                </Button>
              </div>

              <div className="border border-slate-800 rounded-lg p-4 hover:border-sky-400/70 transition-colors">
                <CodeBracketIcon className="h-8 w-8 text-sky-400 mb-2" />
                <h3 className="font-medium mb-1 text-slate-100">
                  Try Demo
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  See the widget in action with live examples.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-700"
                >
                  View Demo
                </Button>
              </div>

              <div className="border border-slate-800 rounded-lg p-4 hover:border-emerald-400/70 transition-colors">
                <svg
                  className="h-8 w-8 text-emerald-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <h3 className="font-medium mb-1 text-slate-100">
                  Get Support
                </h3>
                <p className="text-sm text-slate-400 mb-3">
                  Need help? Reach out to the OnboardX team.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-slate-700"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
