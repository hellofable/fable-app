<script>
	import { _app } from '$lib';
	import EditFolderButton from './EditFolderButton.svelte';
	import TrashFolderButton from './TrashFolderButton.svelte';

	export let folder;
</script>

<div class="btn-group dropstart">
	<button
		on:click={open}
		class="btn btn-link p-3"
		type="button"
		data-bs-toggle="dropdown"
		aria-expanded="false"
	>
		<i class="bi bi-three-dots-vertical"></i>
	</button>
	<ul class="dropdown-menu rounded-0 border-0 shadow-sm">
		<li><EditFolderButton {folder} /></li>
		<li><TrashFolderButton {folder} /></li>
		<!-- <li><hr class="dropdown-divider d-none" /></li> -->
	</ul>
</div>

<style>
	.dropstart {
		position: absolute;
		top: 0px;
		right: 0px;
		z-index: 1;
	}

	.dropdown-menu {
		position: relative;
		top: 20px !important;
	}
</style>
