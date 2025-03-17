<script>
	// e.preventDefault();
	import Swal from 'sweetalert2';
	import { _user, _app, showPopup, toast } from '$lib';

	async function click(e) {
		// `checked` state before user confirmation
		const initialCheckedState = e.target.checked;

		// Revert checkbox state temporarily
		e.target.checked = !initialCheckedState;

		if ($_user.settings.vault.deleteProtect) {
			// Display confirmation dialog

			const result = await showPopup({
				bodyMessage: 'Disable Delete Protect?',
				confirmButton: {
					title: 'Disable',
					class: 'btn-danger'
				}
			});

			// Based on the user decision, change the state
			if (result.message === 'confirmed') {
				result.popup.hide();
				const confirmWithText = await showTextConfirm();
				if (!confirmWithText) return;
				e.target.checked = initialCheckedState;
				$_user.settings.vault.deleteProtect = initialCheckedState;
			}
		} else {
			e.target.checked = true;
			$_user.settings.vault.deleteProtect = true;
			$_user.settings.vault.backups = true;
		}
		pb.db.users.updateSetting('vault', $_user.settings.vault);
	}

	async function showTextConfirm() {
		const { value: confirm } = await Swal.fire({
			title: ' ',
			input: 'text',
			html: 'Please type <strong class="text-danger">disable</strong> to confirm',
			inputPlaceholder: '',
			theme: $_app.view.dark ? 'dark' : 'light',

			position: 'top'
		});
		if (confirm === 'DISABLE' || confirm === 'disable') {
			// toast({ type: 'success', message: 'Delete Protect disabled' });
			return true;
		}
		return false;
	}
</script>

{#if $_user?.settings?.vault}
	<div class="form-check form-switch">
		<input
			on:click={click}
			class="form-check-input"
			type="checkbox"
			id="switchDeleteProtect"
			bind:checked={$_user.settings.vault.deleteProtect}
		/>
	</div>
{/if}
