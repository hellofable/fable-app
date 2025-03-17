import {
	PUBLIC_APP,
	PUBLIC_STRIPE_PRICE_YEARLY,
	PUBLIC_STRIPE_PRICE_MONTHLY
} from '$lib/env.js'

async function getPlan(email) {
	const result = await Swal.fire({
		title: 'Choose Subscription',
		text: " You won't be billed if you cancel during in the first week.",
		showCancelButton: false,
		confirmButtonText: 'Monthly $9/mo',
		confirmButtonColor: '#2e2f33',

		showDenyButton: true,
		denyButtonText: `Yearly $89/yr`,

		denyButtonColor: '#f74d4d'
	});
	if (result.isDenied) return 'yearly';
	if (result.isConfirmed) return 'monthly';
}

async function initiateCheckout({ email, plan }) {
	let priceId;

	if (plan == 'yearly') priceId = PUBLIC_STRIPE_PRICE_YEARLY;
	if (plan == 'monthly') priceId = PUBLIC_STRIPE_PRICE_MONTHLY;

	try {
		const returnUrl = PUBLIC_APP;

		const response = await fetch('/api/stripe/create-checkout-session', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ priceId, email, returnUrl })
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error);
		}

		const session = await response.json();

		// Redirect to Checkout.
		if (session.url) {
			window.location.href = session.url;
		}
	} catch (error) {
		console.error('Error creating checkout session:', error);
	}
}
