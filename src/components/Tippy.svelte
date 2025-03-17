<script>
	import { onMount, onDestroy } from 'svelte';
	import tippy from 'tippy.js';
	import 'tippy.js/dist/tippy.css';

	export let options = {};
	let popoverElement;
	let instance;

	onMount(() => {
		if (popoverElement) {
			options.arrow = false;
			instance = tippy(popoverElement, options);
		}
	});

	onDestroy(() => {
		if (instance) {
			instance.destroy();
		}
	});
</script>

<div bind:this={popoverElement}>
	<div><slot></slot></div>
</div>
