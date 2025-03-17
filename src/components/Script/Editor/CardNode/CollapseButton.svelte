<script>
	export let card;
	import { establishCardsHierarchy } from '$lib';

	function click(e) {
		e.preventDefault();
		card.section.sectionCollapsed = !card.section.sectionCollapsed;
		establishCardsHierarchy();
	}
</script>

<button contenteditable="false" on:click={click} class="btn collapse-button me-1 p-2">
	{#if card.section.sectionCollapsed}
		<i class="bi bi-chevron-right"></i>
	{:else}
		<i class="bi bi-chevron-down"></i>
	{/if}
</button>

<style>
	button {
		height: 45px;
		border-radius: 11px;
	}
</style>
