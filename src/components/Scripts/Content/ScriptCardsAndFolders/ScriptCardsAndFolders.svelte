<script>
	import { _app } from '$lib';
	import Breadcrumbs from './Breadcrumbs/Breadcrumbs.svelte'
	import ScriptCards from './ScriptCards/ScriptCards.svelte';
	import FolderCards from './FolderCards/FolderCards.svelte';
	import AddContent from './AddContent/AddContent.svelte';
	import Toggle from './Toggle.svelte';
	export let hasSharedScripts;
	let scriptCardCount = 0;
	let folderCardCount = 0;
</script>

<div class="d-flex w-100 align-items-center pe-2 mt-2">
	<div class="ms-2" class:d-none={!hasSharedScripts}>
		<Toggle />
	</div>
	<div class="flex-grow-1 ms-2 d-flex w-100">
		<div class="flex-grow-1"><Breadcrumbs /></div>
		<div class="ms-2"><AddContent /></div>
	</div>
</div>

<div class="grid px-2 mt-2" class:d-none={!$_app.scripts.showScripts}>
	<ScriptCards bind:scriptCardCount />
	<FolderCards bind:folderCardCount />

	{#if scriptCardCount === 0 && folderCardCount === 0}
		<div class="fs-4 text-muted ms-1">This folder is empty.</div>
	{/if}
</div>
