<script>
	import { _popup } from '$lib';

	// $: console.log($_popup);
</script>

<div class="modal fade" tabindex="-1" id="popup">
	<div class="modal-dialog">
		<div class="modal-content">
			{#if $_popup.title}
				<div class="modal-header">
					<h5 class="modal-title">{$_popup?.title}</h5>
				</div>
			{/if}
			{#if !$_popup.title}
				<div class="mt-2"></div>
			{/if}

			{#if $_popup?.bodyMessage}
				<div class="modal-body">
					<p>{@html $_popup.bodyMessage}</p>
				</div>
			{/if}
			<div class="modal-footer border-0">
				<button type="button" id="cancelButton" class="btn btn-secondary" data-bs-dismiss="modal"
					>{$_popup?.cancelButton?.title || 'Cancel'}</button
				>
				<button
					disabled={$_popup.isSubmitting}
					class:d-none={$_popup?.confirmButton?.hidden}
					type="button"
					id="confirmButton"
					class="btn submit-button {$_popup?.confirmButton?.class || 'btn-primary'}"
				>
					{#if $_popup.isSubmitting}
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					{:else}
						{$_popup?.confirmButton?.title || 'OK'}
					{/if}
				</button>
			</div>
		</div>
	</div>
</div>
