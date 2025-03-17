<script>
	import { _cards } from '$lib';
	import SideCard from './SideCard/SideCard.svelte';
</script>

<div id="sidecards">
	{#each $_cards as card (card.id)}
		<SideCard bind:card />
	{/each}
</div>

<style>
	#sidecards {
		margin-bottom: 350px;
	}
</style>
