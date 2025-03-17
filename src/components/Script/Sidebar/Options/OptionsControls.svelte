<script>
	import { onMount } from 'svelte';
	import { writable, derived, get } from 'svelte/store';
	export let _app;

	// Original switch definitions
	const initialSwitches1 = [
		{ text: 'INT/EXT', id: 'hideIntExt', checked: false },
		{ text: 'DAY/NIGHT', id: 'hideDayNight', checked: false }
	];

	const initialSwitches2 = [
		{ text: 'Scenes', id: 'sceneHeaders', checked: false },
		{ text: 'Sections', id: 'sectionHeaders', checked: false },
		{ text: 'Scene Numbers', id: 'sceneNumbers', checked: false },
		{ text: 'Synopses', id: 'synopses', checked: false },
		{ text: 'Characters', id: 'characters', checked: true },
		{ text: 'Notes', id: 'notes', checked: false }
	];

	// Helper function to create a derived store
	function getSwitchesFromStore(switches) {
		return derived(_app, ($store) => {
			return switches.map((switchItem) => ({
				...switchItem,
				checked: $store.sidebar.options.values[switchItem.id] ?? false
			}));
		});
	}

	// Using derived stores for switches
	let switches1 = getSwitchesFromStore(initialSwitches1);
	let switches2 = getSwitchesFromStore(initialSwitches2);

	function handleToggle(id, checked) {
		_app.updateSetting(`sidebar.options.values.${id}`, !checked);
	}

	function setDisabled(item) {
		// if (
		// 	!$_app.sidebar.options.values.sceneHeaders &&
		// 	(item.text == "Characters" || item.id == "sceneNumbers")
		// ) {
		// 	return true;
		// }
		return false;
	}
</script>

<!-- Main container with switches -->
<div class:d-none={!$_app.sidebar.options.show} class="container py-3">
	<!-- Iterating over switches2 first -->
	<div class="radio-container">
		{#each $switches2 as item}
			<div class="form-switch form-check">
				<input
					disabled={setDisabled(item)}
					class="form-check-input p2-2"
					type="checkbox"
					id={item.id}
					name={item.id}
					checked={item.checked}
					on:change={(e) => handleToggle(item.id, item.checked)}
				/>
				<label class="form-check-label py-2 w-100" for={item.id}>
					{item.text}
				</label>
			</div>
		{/each}
	</div>
	<!-- <hr /> -->
	<!-- Iterating over switches1 -->
	<div class="radio-container d-none">
		{#each $switches1 as item}
			<div class="form-switch form-check">
				<input
					class="form-check-input"
					type="checkbox"
					id={item.id}
					name={item.id}
					checked={item.checked}
					on:change={(e) => handleToggle(item.id, item.checked)}
				/>
				<label class="form-check-label" for={item.id}>
					{item.text}
				</label>
			</div>
		{/each}
	</div>
</div>

<style>
	.radio-container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}

	.form-switch {
		display: flex;
		align-items: center;
	}

	.form-check-label {
		margin-bottom: 0;
		margin-left: 10px; /* Adjust as needed */
	}
</style>
