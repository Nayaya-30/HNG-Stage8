import { initTour } from './init-tour';

// Export the init function for manual initialization
export { initTour };

// Auto-initialize when module is imported
initTour();

// For backwards compatibility, attach to window object
if (typeof window !== 'undefined') {
	(
		window as Window &
			typeof globalThis & { initTourMaster: typeof initTour }
	).initTourMaster = initTour;
}

export default initTour;
