<script>
	import { _user, _app, _cards } from '$lib';

	import ToolBar from '../Toolbar/Toolbar.svelte';
	import Sidebar from './Sidebar/Sidebar.svelte';

	import { onMount, onDestroy } from 'svelte';
	import Editor from './Editor/Editor.svelte';

	export let script;

	onDestroy(() => {
		_cards.set([]);
	});
</script>

{#if script}
	<div id="workspace" class="h-100 overflow-none d-flex">
		<ToolBar />
		<Sidebar />
		<div id="editor-wrapper">
			<Editor {script} />
		</div>
	</div>
{/if}

<style>
	#editor-wrapper {
		flex: 1;
		overflow-y: auto;
	}
</style>
