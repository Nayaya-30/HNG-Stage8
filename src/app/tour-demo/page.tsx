'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TourDemoPage() {
  const [activeTourType, setActiveTourType] = useState<'ecommerce' | 'saas' | 'custom'>('ecommerce');

  const tourExamples = {
    ecommerce: {
      name: 'E-commerce Product Tour',
      description: 'Guide users through product discovery, cart, and checkout',
      steps: [
        { title: 'Welcome', content: 'Welcome to our store! Let me show you around.' },
        { title: 'Browse Products', content: 'Discover our curated collection of products.' },
        { title: 'Product Details', content: 'Click any product to see detailed information.' },
        { title: 'Add to Cart', content: 'Found something you like? Add it to your cart!' },
        { title: 'Checkout', content: 'Ready to purchase? Head to checkout to complete your order.' },
      ],
    },
    saas: {
      name: 'SaaS Onboarding Tour',
      description: 'Onboard new users to your SaaS platform features',
      steps: [
        { title: 'Welcome', content: 'Welcome to the platform! Let\'s get you started.' },
        { title: 'Dashboard Overview', content: 'This is your main dashboard with key metrics.' },
        { title: 'Create Project', content: 'Click here to create your first project.' },
        { title: 'Team Collaboration', content: 'Invite team members to collaborate.' },
        { title: 'Settings', content: 'Customize your workspace in settings.' },
      ],
    },
    custom: {
      name: 'Custom Feature Tour',
      description: 'Create a personalized tour for any use case',
      steps: [
        { title: 'Introduction', content: 'This is a custom tour tailored to your needs.' },
        { title: 'Feature 1', content: 'Explore this amazing feature.' },
        { title: 'Feature 2', content: 'Learn about another powerful capability.' },
        { title: 'Integration', content: 'See how everything works together.' },
        { title: 'Get Started', content: 'You\'re ready to begin!' },
      ],
    },
  };

  const currentTour = tourExamples[activeTourType];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tour Demo</h1>
        <p className="mt-1 text-gray-500">
          Experience different tour types and see how they work
        </p>
      </div>

      <Tabs value={activeTourType} onValueChange={(v: string) => setActiveTourType(v as 'ecommerce' | 'saas' | 'custom')}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
          <TabsTrigger value="saas">SaaS</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTourType} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tour Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{currentTour.name}</CardTitle>
                  <Badge variant="outline" className="capitalize">{activeTourType}</Badge>
                </div>
                <CardDescription>{currentTour.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Tour Steps ({currentTour.steps.length})</h3>
                  <div className="space-y-3">
                    {currentTour.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-medium text-indigo-600">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{step.title}</p>
                          <p className="text-sm text-gray-600">{step.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full">
                    Launch Demo Tour
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>See how the tour appears to users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-linear-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Interactive Demo</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Click &apos;Launch Demo Tour&apos; to see the widget in action
                      </p>
                    </div>
                    <div className="flex gap-2 justify-center pt-4">
                      <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse delay-75"></div>
                      <div className="w-2 h-2 rounded-full bg-indigo-200 animate-pulse delay-150"></div>
                    </div>
                  </div>

                  {/* Widget Preview in corner */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-white rounded-lg shadow-xl p-4 w-64 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">Step 1 of {currentTour.steps.length}</h4>
                        <button className="text-gray-400 hover:text-gray-600">×</button>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        {currentTour.steps[0].content}
                      </p>
                      <div className="flex justify-between items-center">
                        <button className="text-xs text-gray-500">Skip</button>
                        <button className="px-3 py-1 bg-indigo-600 text-white text-xs rounded-md">
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Features */}
      <Card>
        <CardHeader>
          <CardTitle>Widget Features</CardTitle>
          <CardDescription>Powerful capabilities built into every tour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-sm">Progress Tracking</h4>
                <p className="text-xs text-gray-600">Track user progress through each step</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-sm">Resume Capability</h4>
                <p className="text-xs text-gray-600">Users can resume where they left off</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-sm">Customizable Design</h4>
                <p className="text-xs text-gray-600">Match your brand colors and style</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-100">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-sm">Analytics</h4>
                <p className="text-xs text-gray-600">Detailed insights on user engagement</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-100">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-sm">3D Avatar</h4>
                <p className="text-xs text-gray-600">Engaging Three.js animated guide</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-sm">Easy Integration</h4>
                <p className="text-xs text-gray-600">Simple script tag installation</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}