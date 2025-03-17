<script>
	export let _app;
	import { scrollToCardById } from '$lib';

	// Initialize selected with a fallback if $_app.view or $_app.view.mode is undefined
	let selected = $_app?.view?.mode || 'script';

	// Update $_app.view.mode when selected changes, if $_app.view is defined
	$: if (selected) $_app.view.mode = selected;

	function selectView(mode) {
		selected = mode;
		setTimeout(() => scrollToCardById($_app.currentCard.id), 0);
	}
</script>

<div class="d-flex flex-column">
	<button
		on:click={() => selectView('script')}
		class="btn rounded-bottom-0"
		class:selected={selected === 'script'}
	>
		<i class="bi bi-file-earmark-text"></i>
	</button>
	<button
		on:click={() => selectView('cards')}
		class="btn rounded-top-0"
		class:selected={selected === 'cards'}
	>
		<i class="bi bi-card-text"></i>
	</button>
</div>
