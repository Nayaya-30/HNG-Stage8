"use client";

import { useState } from "react";

export default function DocsPage() {
  const [tourId, setTourId] = useState("tour_abc123");
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
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
      <div className="max-w-5xl mx-auto space-y-10">
        {/* HEADER */}
        <section className="space-y-2">
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
        </section>

        {/* QUICK START */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-5">
          <div>
            <h2 className="text-lg font-semibold">Quick Start</h2>
            <p className="text-sm text-slate-400">
              The fastest way to add tours to your website.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200">
              Your Tour ID
            </label>
            <input
              value={tourId}
              onChange={(e) => setTourId(e.target.value)}
              placeholder="Enter your tour ID"
              className="w-full rounded-lg bg-slate-950 border border-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 outline-none focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
            />
            <p className="text-xs text-slate-500">
              Find your tour ID in the OnboardX dashboard under each tour&apos;s settings.
            </p>
          </div>

          <div className="relative">
            <pre className="bg-slate-950 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-800">
              <code>{scriptCode}</code>
            </pre>
            <button
              onClick={() => copy(scriptCode, "script")}
              className="absolute top-3 right-3 rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-100 hover:bg-slate-800"
            >
              {copied === "script" ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="bg-sky-950/60 border border-sky-500/40 rounded-lg p-4 flex gap-3">
            <span className="text-sky-400 text-lg">💡</span>
            <div className="text-sm">
              <p className="font-medium text-sky-100">Pro Tip</p>
              <p className="text-sky-200/80">
                Place this script just before the closing &lt;/body&gt; tag for the best
                performance.
              </p>
            </div>
          </div>
        </section>

        {/* FRAMEWORK INTEGRATION */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Framework Integration</h2>
            <p className="text-sm text-slate-400">
              Install using your preferred frontend stack.
            </p>
          </div>

          {/* React */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold flex items-center gap-2">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/15 text-[11px] text-sky-300">
                  R
                </span>
                React
              </h3>
            </div>

            <p className="text-xs text-slate-400">
              1. Install the package
            </p>
            <div className="relative">
              <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg overflow-x-auto text-sm border border-slate-800">
                <code>{npmInstall}</code>
              </pre>
              <button
                onClick={() => copy(npmInstall, "npm")}
                className="absolute top-2 right-2 rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-100 hover:bg-slate-800"
              >
                {copied === "npm" ? "Copied!" : "Copy"}
              </button>
            </div>

            <p className="text-xs text-slate-400">
              2. Import and use the component
            </p>
            <div className="relative">
              <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg overflow-x-auto text-sm border border-slate-800">
                <code>{reactCode}</code>
              </pre>
              <button
                onClick={() => copy(reactCode, "react")}
                className="absolute top-2 right-2 rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-100 hover:bg-slate-800"
              >
                {copied === "react" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Vue */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15 text-[11px] text-emerald-300">
                V
              </span>
              Vue
            </h3>

            <p className="text-xs text-slate-400">
              Use the same NPM package, then drop this component setup:
            </p>

            <div className="relative">
              <pre className="bg-slate-950 text-slate-100 p-3 rounded-lg overflow-x-auto text-sm border border-slate-800">
                <code>{vueCode}</code>
              </pre>
              <button
                onClick={() => copy(vueCode, "vue")}
                className="absolute top-2 right-2 rounded-full border border-slate-600 bg-slate-900/80 px-3 py-1 text-[11px] font-medium text-slate-100 hover:bg-slate-800"
              >
                {copied === "vue" ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          {/* Angular note */}
          <div className="pt-4 border-t border-slate-800 text-sm text-slate-400">
            <p className="font-medium text-slate-200 mb-1">Angular</p>
            <p>
              Angular support is coming soon. For now, use the plain script tag method
              in the Quick Start section.
            </p>
          </div>
        </section>

        {/* CONFIG OPTIONS */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Configuration Options</h2>
            <p className="text-sm text-slate-400">
              Customize how the OnboardX widget behaves.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800 text-slate-300">
                  <th className="text-left py-3 px-4 font-medium">Option</th>
                  <th className="text-left py-3 px-4 font-medium">Type</th>
                  <th className="text-left py-3 px-4 font-medium">Default</th>
                  <th className="text-left py-3 px-4 font-medium">Description</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4 font-mono text-xs">tourId</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4 font-mono text-xs">required</td>
                  <td className="py-3 px-4">Unique identifier for your tour.</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4 font-mono text-xs">apiKey</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4 font-mono text-xs">required</td>
                  <td className="py-3 px-4">Your API key from the dashboard.</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4 font-mono text-xs">autoStart</td>
                  <td className="py-3 px-4">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">false</td>
                  <td className="py-3 px-4">
                    Automatically start the tour when the page loads.
                  </td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4 font-mono text-xs">showAvatar</td>
                  <td className="py-3 px-4">boolean</td>
                  <td className="py-3 px-4 font-mono text-xs">true</td>
                  <td className="py-3 px-4">
                    Show a small avatar / guide illustration in the widget.
                  </td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4 font-mono text-xs">position</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4 font-mono text-xs">
                    &apos;bottom-right&apos;
                  </td>
                  <td className="py-3 px-4">Where the launcher bubble appears.</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4 font-mono text-xs">primaryColor</td>
                  <td className="py-3 px-4">string</td>
                  <td className="py-3 px-4 font-mono text-xs">
                    &apos;#4f46e5&apos;
                  </td>
                  <td className="py-3 px-4">Brand color used in the widget UI.</td>
                </tr>
                <tr className="border-b border-slate-800">
                  <td className="py-3 px-4 font-mono text-xs">onComplete</td>
                  <td className="py-3 px-4">function</td>
                  <td className="py-3 px-4 font-mono text-xs">null</td>
                  <td className="py-3 px-4">
                    Callback fired when a user completes the tour.
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono text-xs">onSkip</td>
                  <td className="py-3 px-4">function</td>
                  <td className="py-3 px-4 font-mono text-xs">null</td>
                  <td className="py-3 px-4">
                    Callback fired when a user skips the tour.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* NEXT STEPS */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4 mb-10">
          <div>
            <h2 className="text-lg font-semibold">Next Steps</h2>
            <p className="text-sm text-slate-400">
              Where to go after completing your setup.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="border border-slate-800 rounded-lg p-4 hover:border-amber-300/70 transition-colors">
              <p className="text-lg mb-2">📚</p>
              <h3 className="font-medium mb-1 text-slate-100">
                View Documentation
              </h3>
              <p className="text-slate-400 mb-3">
                Explore advanced features, events and API reference.
              </p>
              <button className="w-full rounded-full border border-slate-700 px-3 py-2 text-[12px] font-medium text-slate-100 hover:bg-slate-800">
                Read Docs
              </button>
            </div>

            <div className="border border-slate-800 rounded-lg p-4 hover:border-sky-400/70 transition-colors">
              <p className="text-lg mb-2">🧪</p>
              <h3 className="font-medium mb-1 text-slate-100">
                Try Demo
              </h3>
              <p className="text-slate-400 mb-3">
                See the widget in action with a live product tour.
              </p>
              <button className="w-full rounded-full border border-slate-700 px-3 py-2 text-[12px] font-medium text-slate-100 hover:bg-slate-800">
                View Demo
              </button>
            </div>

            <div className="border border-slate-800 rounded-lg p-4 hover:border-emerald-400/70 transition-colors">
              <p className="text-lg mb-2">🛟</p>
              <h3 className="font-medium mb-1 text-slate-100">
                Get Support
              </h3>
              <p className="text-slate-400 mb-3">
                Need help? Reach out to the OnboardX team.
              </p>
              <button className="w-full rounded-full border border-slate-700 px-3 py-2 text-[12px] font-medium text-slate-100 hover:bg-slate-800">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
