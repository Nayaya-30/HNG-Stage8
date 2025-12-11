'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

interface TourWidgetProps {
	tourId: string;
	steps: TourStep[];
	onComplete?: () => void;
	onClose?: () => void;
}

export function TourWidget({ steps, onComplete, onClose }: TourWidgetProps) {
	const [currentStep, setCurrentStep] = useState(0);
	const [isVisible, setIsVisible] = useState(true);

	// useEffect(() => {
	//   setIsMounted(true);
	// }, []);


	const nextStep = () => {
		if (currentStep < steps.length - 1) {
			setCurrentStep(currentStep + 1);
		} else {
			onComplete?.();
			setIsVisible(false);
		}
	};

	const prevStep = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const skipTour = () => {
		onClose?.();
		setIsVisible(false);
	};

	if (!isVisible) return null;

	const step = steps[currentStep];
	const hasNext = currentStep < steps.length - 1;
	const hasPrev = currentStep > 0;

	const targetElement = step?.targetElement ? document.querySelector(step.targetElement) as HTMLElement : null;

	// Calculate position for the tooltip
	const calculatePosition = () => {
		if (!targetElement) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

		const rect = targetElement.getBoundingClientRect();
		const scrollX = window.scrollX || window.pageXOffset;
		const scrollY = window.scrollY || window.pageYOffset;

		switch (step.position) {
			case 'top':
				return {
					top: `${rect.top + scrollY - 10}px`,
					left: `${rect.left + scrollX + rect.width / 2}px`,
					transform: 'translate(-50%, -100%)',
				};
			case 'bottom':
				return {
					top: `${rect.bottom + scrollY + 10}px`,
					left: `${rect.left + scrollX + rect.width / 2}px`,
					transform: 'translate(-50%, 0)',
				};
			case 'left':
				return {
					top: `${rect.top + scrollY + rect.height / 2}px`,
					left: `${rect.left + scrollX - 10}px`,
					transform: 'translate(-100%, -50%)',
				};
			case 'right':
				return {
					top: `${rect.top + scrollY + rect.height / 2}px`,
					left: `${rect.right + scrollX + 10}px`,
					transform: 'translate(0, -50%)',
				};
			default:
				return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
		}
	};

	const positionStyle = calculatePosition();

	return createPortal(
		<AnimatePresence>
			{isVisible && (
				<>
					{/* Overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.5 }}
						exit={{ opacity: 0 }}
						className="fixed inset-0 z-50 bg-black"
						onClick={skipTour}
					/>

					{/* Target highlight */}
					{targetElement && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.3 }}
							exit={{ opacity: 0 }}
							className="fixed z-50 bg-blue-500"
							style={{
								top: targetElement.offsetTop,
								left: targetElement.offsetLeft,
								width: targetElement.offsetWidth,
								height: targetElement.offsetHeight,
							}}
						/>
					)}

					{/* Tooltip */}
					<motion.div
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						className="fixed z-50 max-w-md rounded-lg bg-white p-6 shadow-xl"
						style={positionStyle}
					>
						<div className="absolute right-4 top-4">
							<button
								onClick={skipTour}
								className="text-gray-500 hover:text-gray-700"
							>
								<XMarkIcon className="h-5 w-5" />
							</button>
						</div>

						<div className="mb-4 flex items-center justify-between">
							<h3 className="text-lg font-semibold">{step.title}</h3>
							<span className="text-sm text-gray-500">
								{currentStep + 1} of {steps.length}
							</span>
						</div>

						<p className="mb-6 text-gray-700">{step.content}</p>

						<div className="flex items-center justify-between">
							<button
								onClick={prevStep}
								disabled={!hasPrev}
								className={`flex items-center ${!hasPrev ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`}
							>
								<ChevronLeftIcon className="h-5 w-5" />
								Previous
							</button>

							<div className="flex space-x-2">
								{hasNext ? (
									<button
										onClick={nextStep}
										className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
									>
										Next
										<ChevronRightIcon className="ml-2 inline h-5 w-5" />
									</button>
								) : (
									<button
										onClick={onComplete}
										className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
									>
										<ArrowPathIcon className="mr-2 inline h-5 w-5" />
										Finish Tour
									</button>
								)}

								<button
									onClick={skipTour}
									className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-100"
								>
									Skip
								</button>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body
	);
}

{/*just*/ }