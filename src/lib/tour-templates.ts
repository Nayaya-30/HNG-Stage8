export const tourTemplates = {
	ecommerce: {
		name: 'E-commerce Product Tour',
		type: 'ecommerce' as const,
		status: 'draft' as const,
		steps: [
			{
				id: 'step_1',
				title: 'Welcome to Our Store',
				content:
					'Discover amazing products and exclusive deals. Let me show you around!',
				position: 'bottom' as const,
				targetElement: '#hero-section',
			},
			{
				id: 'step_2',
				title: 'Browse Products',
				content:
					'Explore our curated collection. Use filters to find exactly what you need.',
				position: 'right' as const,
				targetElement: '#product-grid',
			},
			{
				id: 'step_3',
				title: 'Product Details',
				content:
					'Click any product to see detailed information, reviews, and specifications.',
				position: 'left' as const,
				targetElement: '.product-card',
			},
			{
				id: 'step_4',
				title: 'Add to Cart',
				content:
					'Found something you like? Click "Add to Cart" to save it for checkout.',
				position: 'top' as const,
				targetElement: '#add-to-cart-btn',
			},
			{
				id: 'step_5',
				title: 'Shopping Cart',
				content:
					'Review your items, adjust quantities, and apply discount codes here.',
				position: 'left' as const,
				targetElement: '#cart-icon',
			},
			{
				id: 'step_6',
				title: 'Secure Checkout',
				content:
					'Ready to purchase? Our secure checkout process is fast and easy.',
				position: 'bottom' as const,
				targetElement: '#checkout-btn',
			},
			{
				id: 'step_7',
				title: 'Track Your Order',
				content:
					'After purchase, track your order status in your account dashboard.',
				position: 'right' as const,
				targetElement: '#account-menu',
			},
		],
	},
	saas: {
		name: 'SaaS Platform Onboarding',
		type: 'saas' as const,
		status: 'draft' as const,
		steps: [
			{
				id: 'step_1',
				title: 'Welcome to the Platform',
				content:
					"Great to have you here! Let's get you set up in just a few minutes.",
				position: 'bottom' as const,
			},
			{
				id: 'step_2',
				title: 'Your Dashboard',
				content:
					'This is your command center. View key metrics and recent activity at a glance.',
				position: 'right' as const,
				targetElement: '#dashboard',
			},
			{
				id: 'step_3',
				title: 'Create Your First Project',
				content:
					'Click here to create a new project and start organizing your work.',
				position: 'left' as const,
				targetElement: '#create-project-btn',
			},
			{
				id: 'step_4',
				title: 'Invite Team Members',
				content:
					'Collaboration is key! Invite your team to work together seamlessly.',
				position: 'bottom' as const,
				targetElement: '#invite-team-btn',
			},
			{
				id: 'step_5',
				title: 'Customize Settings',
				content:
					'Personalize your workspace with custom themes, notifications, and preferences.',
				position: 'left' as const,
				targetElement: '#settings-menu',
			},
			{
				id: 'step_6',
				title: 'Integrations',
				content:
					'Connect your favorite tools and services to streamline your workflow.',
				position: 'right' as const,
				targetElement: '#integrations',
			},
			{
				id: 'step_7',
				title: 'Get Help Anytime',
				content:
					'Need assistance? Access our help center, documentation, and support chat here.',
				position: 'top' as const,
				targetElement: '#help-icon',
			},
		],
	},
	custom: {
		name: 'Custom Feature Tour',
		type: 'custom' as const,
		status: 'draft' as const,
		steps: [
			{
				id: 'step_1',
				title: 'Getting Started',
				content:
					'Welcome! This tour will guide you through the key features of our platform.',
				position: 'bottom' as const,
			},
			{
				id: 'step_2',
				title: 'Main Navigation',
				content:
					'Use this menu to navigate between different sections of the application.',
				position: 'right' as const,
				targetElement: '#main-nav',
			},
			{
				id: 'step_3',
				title: 'Search Functionality',
				content:
					'Quickly find what you need using our powerful search feature.',
				position: 'bottom' as const,
				targetElement: '#search-bar',
			},
			{
				id: 'step_4',
				title: 'User Profile',
				content:
					'Manage your account settings and preferences from your profile menu.',
				position: 'left' as const,
				targetElement: '#user-profile',
			},
			{
				id: 'step_5',
				title: 'Notifications',
				content:
					'Stay updated with real-time notifications about important events.',
				position: 'left' as const,
				targetElement: '#notifications',
			},
		],
	},
};

export type TourTemplate = (typeof tourTemplates)[keyof typeof tourTemplates];
