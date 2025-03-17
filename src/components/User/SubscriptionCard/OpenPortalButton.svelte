<script>
	let isOpeningPortal = false;
	export let buttonText;

	async function openBillingPortal() {
		isOpeningPortal = true;
		const token = pb.authStore.token;
		try {
			// Make a POST request to the endpoint we defined
			const response = await fetch('/api/stripe/createPortal', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}` // Replace with the actual token from your auth system
				}
			});

			const data = await response.json();

			console.log(data);

			if (response.ok) {
				// Redirect the user to the Stripe Customer Portal
				window.location.href = data.url;
			} else {
				console.error('Error opening billing portal:', data.message);
				alert(`Error: ${data.message}`);
			}
		} catch (error) {
			console.error('Unexpected error:', error);
			alert('An unexpected error occurred. Please try again later.');
		}
	}
</script>

<button
	disabled={isOpeningPortal}
	on:click={openBillingPortal}
	class="w-100 btn-sm btn btn-secondary"
>
	{#if isOpeningPortal}
		<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
	{:else}
		{buttonText}
	{/if}
</button>

<style>
	.spinner-border {
		opacity: 0.5;
	}
</style>
