<script>
	import { onMount } from 'svelte';
	let isFull = false;
	export let roundedClass = '';

	onMount(() => {
		document.addEventListener('fullscreenchange', () => {
			isFull = document.fullscreenElement ? true : false;
		});
	});

	function fullscreen() {
		document.fullscreenElement
			? document.exitFullscreen()
			: document.documentElement.requestFullscreen();
	}
</script>

<button class:selected={isFull} on:click={fullscreen} class="btn {roundedClass}">
	<i class="bi bi-fullscreen"></i>
</button>
