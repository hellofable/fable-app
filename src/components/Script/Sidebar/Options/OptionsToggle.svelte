<script>
	export let _app;

	function toggle() {
		$_app.sidebar.options.show = !$_app.sidebar.options.show;
	}
</script>

<div class="options-toggle w-100 text-center pointer">
	<button on:click={toggle} class="btn btn-sm p-1 m-0 w-100 border-0">
		{#if $_app.sidebar.options.show}
			<i class="bi bi-caret-down-fill"></i>
		{/if}
		{#if !$_app.sidebar.options.show}
			<i class="bi bi-caret-up-fill"></i>
		{/if}
	</button>
</div>

<style>
	.btn {
		text-decoration: none;
		color: unset;
	}
</style>
