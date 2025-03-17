<script>
	export let _app;

	function toggle() {
		$_app.toolbar.show = !$_app.toolbar.show;
		console.log('toggle');
	}
</script>

<button on:click={toggle} class="btn">
	<i class="bi bi-arrows-expand-vertical"></i>
</button>
