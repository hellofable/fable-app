<script>
	import { _app, _scripts, _user } from '$lib';
	$: hasSharedScripts = $_scripts.some((script) => !script.inTrash && $_user.id !== script.ownerId);
	import ScriptCardsAndFolders from './ScriptCardsAndFolders/ScriptCardsAndFolders.svelte';
	import SharedCards from './SharedCards/SharedCards.svelte';
</script>

<div id="scripts-content" class="h-100 overflow-auto">
	<ScriptCardsAndFolders {hasSharedScripts} />
	<div class:d-none={!hasSharedScripts}><SharedCards {hasSharedScripts} /></div>
</div>
