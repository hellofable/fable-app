<script>
	import { _app } from '$lib';
	import Tippy from '../Tippy.svelte';
</script>

<div class="server-status">
	{#if $_app.server.hp.status === 'connected'}
		<Tippy options={{ content: 'connected', placement: 'left' }}>
			<div class="p-1"><div class="connected"></div></div>
		</Tippy>
	{:else}
		<span class="small">connecting</span>
		<div
			class="spinner spinner-border spinner-border-sm ms-2"
			role="status"
			aria-hidden="true"
		></div>
	{/if}
</div>

<style>
	.server-status {
		position: fixed;
		top: 15px;
		right: 30px;
		display: flex;
		align-items: center;
	}

	.connected {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: #28a745;
		animation: pulse 1.5s infinite; /* Add pulse animation */
	}

	.disconnected {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background-color: red;
		animation: pulse 1.5s infinite; /* Add pulse animation */
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	.spinner {
		opacity: 0.3;
	}
</style>
