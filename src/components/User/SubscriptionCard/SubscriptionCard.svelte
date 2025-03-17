<script>
	import { _stripe, _user, pb } from '$lib';
	import moment from 'moment';
	import OpenPortalButton from './OpenPortalButton.svelte';
	import SubscribeAgain from './SubscribeAgain/SubscribeAgain.svelte';

	let current_period_end = '';
	let interval = '';
	let active = '';

	$: {
		const subscription = $_stripe?.subscription;
		const plan = subscription?.items?.data?.[0]?.plan;

		current_period_end = subscription?.current_period_end || '';
		interval = plan?.interval || '';
		active = !subscription?.cancel_at_period_end;
	}

	$: formattedDate = moment.unix(current_period_end).format('MMM D, YYYY');
	$: intervalFormatted = interval.toUpperCase() + 'LY';
</script>

{#if active && $_stripe?.subscription}
	<div class="card w-100 border-0 mt-2">
		<div class="card-body">
			<h5 class="card-title mb-3">Subscription</h5>

			<div class="text-secondary">
				<div>
					Your plan status is <span class="badge text-bg-success">ACTIVE</span>
				</div>
				<div class="mt-2">
					You are on the <span class="fw-bold">{intervalFormatted}</span>
					plan and your plan will renew on
					<span class="fw-bold">{formattedDate}</span>
				</div>
			</div>
			<div class="mt-3"></div>
			<OpenPortalButton buttonText="Manage Subscription" />
		</div>
	</div>
{/if}

{#if !active && $_stripe?.subscription}
	<div class="card w-100 border-0">
		<div class="card-body">
			<h5 class="card-title">Subscription</h5>
			<div class="text-secondary">
				<div>
					Your plan status is <span class="ms-1 badge text-bg-danger">CANCELED</span>
				</div>
				<div class="mt-2">
					However, you will have access to your plan until
					<span class="fw-bold">{formattedDate}</span>.
				</div>
			</div>
			<div class="mt-3"></div>
			<OpenPortalButton buttonText="Manage Subscription" />
		</div>
	</div>
{/if}

{#if !$_stripe?.subscription}
	<div class="card w-100 border-0">
		<div class="card-body">
			<h5 class="card-title">Subscription</h5>
			<div class="text-secondary">
				<div>
					Your plan status is <span class="ms-1 badge text-bg-danger">CANCELED</span>
				</div>
				<div class="mt-2"></div>
			</div>
			<SubscribeAgain />
			<div class="mb-2"></div>
			<OpenPortalButton buttonText="See Past Invoices" />
		</div>
	</div>
{/if}

<style>
	.card {
		font-size: 14px;
	}
</style>
