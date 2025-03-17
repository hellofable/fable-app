<script>
	export let isCollapsed;
	export let script;
</script>

<div>
	<button
		on:click={() => (isCollapsed = !isCollapsed)}
		class="btn btn-link btn-sm p-0 m-0 me-2 fw-bold"
	>
		{#if isCollapsed}
			<i class="bi bi-chevron-right"></i>
		{:else}
			<i class="bi bi-chevron-down"></i>
		{/if}
	</button>
</div>

<style>
	.btn-link {
		text-decoration: none;
		color: unset;
	}

	.btn-link:hover,
	.btn-link:focus .btn-link:active {
		color: unset;
	}
</style>
