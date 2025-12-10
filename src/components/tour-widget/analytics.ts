// Analytics utility for tracking tour events
export class TourAnalytics {
	private tourId: string;
	private apiUrl: string;

	constructor(
		tourId: string,
		apiUrl: string = 'https://api.tourmaster.com/v1'
	) {
		this.tourId = tourId;
		this.apiUrl = apiUrl;
	}

	// Track when a tour is started
	async trackStart(userId?: string) {
		return this.sendEvent('tour_start', { userId });
	}

	// Track when a step is viewed
	async trackStepView(stepId: string, userId?: string) {
		return this.sendEvent('step_view', { stepId, userId });
	}

	// Track when a step is completed
	async trackStepComplete(stepId: string, userId?: string) {
		return this.sendEvent('step_complete', { stepId, userId });
	}

	// Track when a tour is completed
	async trackComplete(userId?: string) {
		return this.sendEvent('tour_complete', { userId });
	}

	// Track when a tour is skipped
	async trackSkip(stepId?: string, userId?: string) {
		return this.sendEvent('tour_skip', { stepId, userId });
	}

	// Generic event sender
	private async sendEvent(eventType: string, data: Record<string, unknown>) {
		try {
			// In a real implementation, send to your analytics backend
			console.log(`[TourAnalytics] Event: ${eventType}`, {
				tourId: this.tourId,
				eventType,
				timestamp: new Date().toISOString(),
				...data,
			});

			// Uncomment and configure for real implementation:
			/*
      await fetch(`${this.apiUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tourId: this.tourId,
          eventType,
          timestamp: new Date().toISOString(),
          ...data,
        }),
      });
      */
		} catch (error) {
			console.error('Failed to send analytics event:', error);
		}
	}
}

// Create a default analytics instance
export const analytics = new TourAnalytics('default');
