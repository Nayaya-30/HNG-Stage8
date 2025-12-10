import { useState, useEffect } from 'react';

interface TourStep {
  id: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
  targetElement?: string;
}

interface UseTourProps {
  steps: TourStep[];
  onComplete?: () => void;
  onClose?: () => void;
}

export const useTour = ({ steps, onComplete, onClose }: UseTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isShowing, setIsShowing] = useState(false);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  // Find target element when step changes
  useEffect(() => {
    if (steps[currentStep]?.targetElement) {
      const element = document.querySelector(steps[currentStep].targetElement!);
      const id = setTimeout(() => setTargetElement(element as HTMLElement), 0);
      return () => clearTimeout(id);
    } else {
      const id = setTimeout(() => setTargetElement(null), 0);
      return () => clearTimeout(id);
    }
  }, [currentStep, steps]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      finishTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const startTour = () => {
    setCurrentStep(0);
    setIsShowing(true);
  };

  const finishTour = () => {
    setIsShowing(false);
    onComplete?.();
  };

  const closeTour = () => {
    setIsShowing(false);
    onClose?.();
  };

  const hasNext = currentStep < steps.length - 1;
  const hasPrev = currentStep > 0;

  return {
    currentStep,
    isShowing,
    targetElement,
    nextStep,
    prevStep,
    goToStep,
    startTour,
    finishTour,
    closeTour,
    hasNext,
    hasPrev,
    totalSteps: steps.length,
  };
};
