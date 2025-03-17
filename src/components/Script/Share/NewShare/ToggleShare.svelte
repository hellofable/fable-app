<script>
	export let show = false;
</script>

<button on:click={() => (show = !show)} class="btn btn-link p-0 m-0">
	{#if show}
		<i class="bi bi-chevron-down"></i>
	{/if}
	{#if !show}
		<i class="bi bi-chevron-right"></i>
	{/if}
	Add New Share
</button>

<style>
	button,
	button:active,
	button:focus,
	button:focus-visible {
		color: grey !important;
		box-shadow: none !important;
		text-decoration: none !important;
	}
	button {
		position: relative;
		top: -2px;
	}
</style>
