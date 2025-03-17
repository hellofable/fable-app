<script>
	import ScriptsSidebar from './ScriptsSidebar/ScriptsSidebar.svelte';
	import ToolbarScripts from '../Toolbar/Toolbar-Scripts.svelte';
	import Content from './Content/Content.svelte';
	import Script from '../Script/Script.svelte';
	import StoryBuilder from '../StoryBuilder/StoryBuilder.svelte';
	import { onMount } from 'svelte';
</script>

<!-- preload all the script files -->
<Script script={null} />
<StoryBuilder />
<div class="d-flex vh-100 overflow-hidden">
	<ScriptsSidebar />
	<div class="d-flex flex-column flex-grow-1">
		<ToolbarScripts />
		<div class="flex-grow-1 overflow-auto">
			<Content />
		</div>
	</div>
</div>
