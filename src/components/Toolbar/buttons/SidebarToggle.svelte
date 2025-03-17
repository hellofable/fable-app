<script>
	export let _app;

	function toggle() {
		$_app.sidebar.show = !$_app.sidebar.show;
	}
</script>

<button on:click={toggle} class="btn">
	<i class="bi bi-layout-sidebar"></i>
</button>
