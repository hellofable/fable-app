<script>
	import ToggleOptions from './ToggleOptions.svelte';
	import BackupsToggle from './Backups/BackupsToggle.svelte';
	import DeleteProtectInfoButton from './DeleteProtect/DeleteProtectInfoButton.svelte';
	import DeleteProtectToggle from './DeleteProtect/DeleteProtectToggle.svelte';
	import { _app, _user } from '$lib';
</script>

<div class="rounded-bottom mx-2 vault-options">
	<div class:d-none={$_app.scriptsSidebar.vault.showOptions} class="p-2">
		<div class="d-flex w-100 px-2 my-2">
			<div class="flex-grow-1">
				<label for="switchBackups">Backups</label>
			</div>
			<BackupsToggle />
		</div>
		<div class="d-flex w-100 px-2 my-2">
			<div class="flex-grow-1">
				<label for="switchDeleteProtect"> Delete Protect</label>

				<DeleteProtectInfoButton />
			</div>
			<DeleteProtectToggle />
		</div>
	</div>

	<ToggleOptions {_app} />
</div>

<style>
	button {
		text-decoration: none;
		position: relative;
		top: -1px;
	}
</style>
