<script>
	import { insertCard } from './insertCard';
	export let node, getPos;

	function open(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	function stopPropagation(e) {
		e.stopPropagation();
		e.preventDefault();
	}
</script>

<div class="dropdown">
	<button
		on:mousedown={stopPropagation}
		on:mouseup={stopPropagation}
		on:click={open}
		class="btn btn-link p-0 m-0"
		type="button"
		data-bs-toggle="dropdown"
		aria-expanded="false"
	>
		<i class="bi bi-three-dots-vertical"></i>
	</button>
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<ul on:mousedown={stopPropagation} on:mouseup={stopPropagation} class="dropdown-menu">
		<li>
			<a on:click={() => insertCard('above', getPos, node)} class="dropdown-item" href="#"
				>Add Card Above</a
			>
		</li>
		<li>
			<a on:click={() => insertCard('below', getPos, node)} class="dropdown-item" href="#"
				>Add Card Below</a
			>
		</li>
	</ul>
</div>

<style>
	.btn-link,
	a {
		color: unset;
		cursor: pointer;
		user-select: none;
		font-family:
			system-ui,
			-apple-system,
			'Segoe UI',
			Roboto,
			'Helvetica Neue',
			'Noto Sans',
			'Liberation Sans',
			Arial,
			sans-serif,
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol',
			'Noto Color Emoji';
	}

	.bi-three-dots-vertical {
		opacity: 0.2;
	}
</style>
