<script>
	import { _app } from '$lib';

	$: src = 'https://ai-dev.hellofable.com?dark=' + $_app.view.dark;
	let el;

	// Ensure reactivity and handle cases where show is null or undefined
	$: {
		const isVisible = !!$_app?.storybuilder?.show; // Convert to boolean (false if null, undefined, or false)

		if (el) isVisible ? el.classList.add('visible') : el.classList.remove('visible');
	}
</script>

<div bind:this={el} class="story-builder shadow">
	<div class="iframe-container">
		<iframe {src} title="Story Builder"></iframe>
	</div>
</div>

<style>
	.story-builder {
		position: fixed;
		right: 0;
		width: 600px;
		max-width: 100%;
		height: 100vh;
		z-index: 1000;
		overflow-y: auto;
		background: black;
		overflow: hidden;

		/* Initially hidden */
		transform: translateX(100%);
		transition: transform 0.4s ease-in-out;
	}

	.iframe-container {
		width: 100vw;
		height: 100vh;
		overflow: auto;
		position: relative;
		z-index: 1001;
	}

	iframe {
		width: 600px;
		height: 100%;
		border: none;
	}
</style>
