<script>
	export let type, _app;
	import { _cards, establishCardsHierarchy } from '$lib';

	function toggleAll(sectionCollapsed) {
		_cards.collapseOrExpandAll(sectionCollapsed);
		establishCardsHierarchy();
	}
</script>

{#if $_app}
	<div>
		{#if type == 'expand'}
			<button
				on:click={() => {
					toggleAll(true);
				}}
				class="btn rounded-bottom-0"
			>
				<i class="bi bi-chevron-up"></i>
			</button>
		{/if}

		{#if type == 'collapse'}
			<button
				on:click={() => {
					toggleAll(false);
				}}
				class="btn rounded-top-0"
			>
				<i class="bi bi-chevron-down"></i>
			</button>
		{/if}
	</div>
{/if}

<style>
	button:disabled {
		cursor: not-allowed; /* Change cursor to not-allowed */
		opacity: 1; /* Slightly fade out the button */
		border: 0;
	}

	button:disabled i {
		opacity: 0.2;
	}

	button {
		border: 0;
	}
</style>
