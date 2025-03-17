<script>
	import { _user, pb, _app, showPopup } from '$lib';

	async function click(e) {
		// If DeleteProtect is enabled and backups are being disabled, show an error message
		if ($_user.settings.vault.deleteProtect && e.target.checked === false) {
			e.target.checked = true;
			const result = await showPopup({
				title: '',
				bodyMessage:
					'<i class="bi bi-info-circle"></i> You cannot disable Backups while <span class="fw-bold">Delete Protect </span>is enabled.',
				confirmButton: {
					hidden: true
				},
				cancelButton: {
					title: 'Close'
				}
			});
			return;
		}

		// If Delete Protect is disabled and backups are currently disabled, enable backups
		if (!$_user.settings.vault.deleteProtect && $_user.settings.vault.backups === false) {
			console.log('1');

			// Enable backups
			e.target.checked = true;
			$_user.settings.vault.backups = true;
			pb.db.users.updateSetting('vault', $_user.settings.vault);
			return;
		}

		// prompt before disabling backups
		if ($_user.settings.vault.backups === true) {
			e.target.checked = true;
			const res = await showPopup({
				title: 'Disable Backups',
				bodyMessage: 'Are you sure you want to disable backups?',
				confirmButton: {
					title: 'Disable',
					class: 'btn-danger'
				}
			});

			if (res.message == 'confirmed') {
				$_user.settings.vault.backups = false;
				pb.db.users.updateSetting('vault', $_user.settings.vault);
				res.popup.hide();
			}
		}
	}
</script>

{#if $_user?.settings?.vault}
	<div class="form-check form-switch">
		<input
			on:click={click}
			class="form-check-input"
			type="checkbox"
			id="switchBackups"
			bind:checked={$_user.settings.vault.backups}
		/>
	</div>
{/if}
