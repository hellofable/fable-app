<script>
	import { _app } from '$lib';
	import User from '../../../../Toolbar/buttons/dropdowns/User.svelte';
	function handleClick() {
		$_app.scriptsSidebar.show = !$_app.scriptsSidebar.show;
	}
</script>

<div class="d-flex justify-content-between align-items-center w-100 p-2">
	<button
		on:click={handleClick}
		class:d-none={!$_app.scriptsSidebar.show}
		class="btn btn-secondary"
	>
		<i class="bi bi-layout-sidebar"></i>
	</button>

	<div class="d-none align-items-center">
		<button class="btn btn-secondary ms-2">
			<i class="bi bi-gear"></i>
		</button>
		<div class="ms-1"><User /></div>
	</div>
</div>

<style>
	.btn {
		border-radius: 12px;
	}
</style>
