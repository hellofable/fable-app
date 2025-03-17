<script>
	import { showPopup } from '$lib';

	async function click(e) {
		const result = await showPopup({
			title: '',
			bodyMessage:
				'When <span class="fw-bold">Delete Protect </span> is enabled you will not be able to delete backups.',
			confirmButton: {
				hidden: true
			},
			cancelButton: {
				title: 'Got It'
			}
		});
	}
</script>

<button on:click={click} class="btn btn-link p-0 m-0 text-muted">
	<i class="bi bi-question-circle-fill"></i>
</button>

<style>
	button {
		opacity: 0.5;
	}
</style>
