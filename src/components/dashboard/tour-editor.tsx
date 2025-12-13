// ./src/components/dashboard/tour-editor.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
	PlusIcon,
	TrashIcon,
	ArrowUpIcon,
	ArrowDownIcon
} from '@heroicons/react/24/outline';

interface TourStep {
	id: string;
	title: string;
	content: string;
	position: 'top' | 'bottom' | 'left' | 'right';
	targetElement?: string;
}

// FIX: Update type to include 'educational' and remove 'undefined'
export interface TourFormData {
	name: string;
	type: 'ecommerce' | 'saas' | 'educational' | 'custom';
	status: 'draft' | 'active';
	steps: TourStep[];
}

interface TourEditorProps {
	initialData?: TourFormData;
	onSave: (data: TourFormData) => void;
	onCancel: () => void;
}

export function TourEditor({ initialData, onSave, onCancel }: TourEditorProps) {
	const [formData, setFormData] = useState<TourFormData>({
		name: initialData?.name || '',
		type: initialData?.type || 'custom',
		status: initialData?.status || 'draft',
		steps: initialData?.steps || [
			{ id: 'step_1', title: '', content: '', position: 'bottom' },
			{ id: 'step_2', title: '', content: '', position: 'bottom' },
			{ id: 'step_3', title: '', content: '', position: 'bottom' },
			{ id: 'step_4', title: '', content: '', position: 'bottom' },
			{ id: 'step_5', title: '', content: '', position: 'bottom' },
		],
	});

	const updateStep = (index: number, field: keyof TourStep, value: string) => {
		const updatedSteps = [...formData.steps];
		updatedSteps[index] = { ...updatedSteps[index], [field]: value };
		setFormData({ ...formData, steps: updatedSteps });
	};

	const addStep = () => {
		const newStep = {
			id: `step_${formData.steps.length + 1}`,
			title: '',
			content: '',
			position: 'bottom' as const,
		};
		setFormData({ ...formData, steps: [...formData.steps, newStep] });
	};

	const removeStep = (index: number) => {
		if (formData.steps.length <= 5) {
			alert('A tour must have at least 5 steps');
			return;
		}

		const updatedSteps = formData.steps.filter((_, i) => i !== index);
		setFormData({ ...formData, steps: updatedSteps });
	};

	const moveStep = (index: number, direction: 'up' | 'down') => {
		const updatedSteps = [...formData.steps];
		if (direction === 'up' && index > 0) {
			[updatedSteps[index], updatedSteps[index - 1]] = [updatedSteps[index - 1], updatedSteps[index]];
		} else if (direction === 'down' && index < updatedSteps.length - 1) {
			[updatedSteps[index], updatedSteps[index + 1]] = [updatedSteps[index + 1], updatedSteps[index]];
		}
		setFormData({ ...formData, steps: updatedSteps });
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			<Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
				<CardHeader>
					<CardTitle className="text-brand-gold">Tour Details</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="name" className="text-slate-200">Tour Name *</Label>
						<Input
							id="name"
							value={formData.name}
							onChange={(e) => setFormData({ ...formData, name: e.target.value })}
							placeholder="Enter tour name"
							className="bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="type" className="text-slate-200">Tour Type *</Label>
						<Select
							value={formData.type}
							onValueChange={(value: 'ecommerce' | 'saas' | 'educational' | 'custom') =>
								setFormData({ ...formData, type: value })
							}
						>
							<SelectTrigger className="bg-slate-950 border border-slate-800 text-slate-100">
								<SelectValue placeholder="Select tour type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="ecommerce">E-commerce</SelectItem>
								<SelectItem value="saas">SaaS</SelectItem>
								<SelectItem value="educational">Educational</SelectItem>
								<SelectItem value="custom">Custom</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className="space-y-2">
						<Label htmlFor="status" className="text-slate-200">Status</Label>
						<Select
							value={formData.status}
							onValueChange={(value: 'draft' | 'active') =>
								setFormData({ ...formData, status: value })
							}
						>
							<SelectTrigger className="bg-slate-950 border border-slate-800 text-slate-100">
								<SelectValue placeholder="Select status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="draft">Draft</SelectItem>
								<SelectItem value="active">Active</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			<Card className="bg-brand-royal/30 border border-brand-royal/20 backdrop-blur-lg shadow-lg">
				<CardHeader className="flex flex-row items-center justify-between">
					<CardTitle className="text-brand-gold">Tour Steps</CardTitle>
					<Button type="button" variant="outline" onClick={addStep} className="bg-slate-950 border border-slate-700 text-white hover:bg-slate-800">
						<PlusIcon className="mr-2 h-4 w-4" />
						Add Step
					</Button>
				</CardHeader>
				<CardContent className="space-y-6">
					{formData.steps.map((step, index) => (
						<Card key={step.id} className="bg-brand-royal/20 border border-brand-royal/20">
							<CardContent className="pt-6">
								<div className="flex items-center justify-between mb-4">
									<Badge variant="secondary">Step {index + 1}</Badge>
									<div className="flex space-x-2">
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => moveStep(index, 'up')}
											disabled={index === 0}
										>
											<ArrowUpIcon className="h-4 w-4" />
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => moveStep(index, 'down')}
											disabled={index === formData.steps.length - 1}
										>
											<ArrowDownIcon className="h-4 w-4" />
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											onClick={() => removeStep(index)}
											disabled={formData.steps.length <= 5}
										>
											<TrashIcon className="h-4 w-4" />
										</Button>
									</div>
								</div>

								<div className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor={`step-title-${index}`} className="text-slate-200">Title *</Label>
										<Input
											id={`step-title-${index}`}
											value={step.title}
											onChange={(e) => updateStep(index, 'title', e.target.value)}
											placeholder="Enter step title"
											className="bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor={`step-content-${index}`} className="text-slate-200">Content *</Label>
										<Textarea
											id={`step-content-${index}`}
											value={step.content}
											onChange={(e) => updateStep(index, 'content', e.target.value)}
											placeholder="Enter step content/description"
											rows={3}
											className="bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
										/>
									</div>

									<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
										<div className="space-y-2">
											<Label htmlFor={`step-position-${index}`} className="text-slate-200">Position</Label>
											<Select
												value={step.position}
												onValueChange={(value: 'top' | 'bottom' | 'left' | 'right') =>
													updateStep(index, 'position', value)
												}
											>
												<SelectTrigger className="bg-slate-950 border border-slate-800 text-slate-100">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="top">Top</SelectItem>
													<SelectItem value="bottom">Bottom</SelectItem>
													<SelectItem value="left">Left</SelectItem>
													<SelectItem value="right">Right</SelectItem>
												</SelectContent>
											</Select>
										</div>

										<div className="space-y-2">
											<Label htmlFor={`step-target-${index}`} className="text-slate-200">Target Element (Optional)</Label>
											<Input
												id={`step-target-${index}`}
												value={step.targetElement || ''}
												onChange={(e) => updateStep(index, 'targetElement', e.target.value)}
												placeholder="CSS selector (e.g., #hero-button)"
												className="bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-amber-300 focus:ring-1 focus:ring-amber-300"
											/>
										</div>
									</div>
								</div>
							</CardContent>
						</Card>
					))}
				</CardContent>
			</Card>

			<div className="flex justify-end space-x-4">
				<Button type="button" variant="outline" onClick={onCancel} className="bg-slate-950 border border-slate-700 text-white hover:bg-slate-800">
					Cancel
				</Button>
				<Button type="submit" className="bg-amber-300 text-slate-950 hover:bg-amber-200">Save Tour</Button>
			</div>
		</form>
	);
}
