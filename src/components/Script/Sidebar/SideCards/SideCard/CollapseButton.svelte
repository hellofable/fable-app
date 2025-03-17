<script>
	export let card;
	import { establishCardsHierarchy } from '$lib';

	function click(e) {
		e.preventDefault();
		card.section.sectionCollapsed = !card.section.sectionCollapsed;
		establishCardsHierarchy();
	}
</script>

<button
	class:d-none={!card.section.isSection}
	on:click={click}
	class="btn me-1 h-100 p-2 collapse-button"
>
	{#if card.section.sectionCollapsed}
		<i class="bi bi-chevron-right"></i>
	{/if}
	{#if !card.section.sectionCollapsed}
		<i class="bi bi-chevron-down"></i>
	{/if}
</button>

<style>
</style>
