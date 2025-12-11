'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  XMarkIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface TourStep {
  id: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  targetElement?: string;
}

interface TourPreviewProps {
  steps: TourStep[];
  onClose: () => void;
}

export function TourPreview({ steps, onClose }: TourPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  // Reset to first step when steps change
  useEffect(() => {
    const id = setTimeout(() => setCurrentStep(0), 0);
    return () => clearTimeout(id);
  }, [steps]);

  if (steps.length === 0) return null;

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`relative rounded-lg bg-white p-6 shadow-xl transition-all duration-300 ${isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
        <div className="absolute right-4 top-4">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <XMarkIcon className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <span className="text-sm text-gray-500">
            {currentStep + 1} of {steps.length}
          </span>
        </div>
        
        <p className="mb-6 text-gray-700">{step.content}</p>
        
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {currentStep < steps.length - 1 ? (
              <Button onClick={nextStep}>
                Next
                <ChevronRightIcon className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={onClose}>
                <ArrowPathIcon className="mr-2 h-4 w-4" />
                Restart Tour
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
