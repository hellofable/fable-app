<script>
	import { _modal, pb, showPopup } from '$lib';
	import Form from '/src/components/Other/Form.svelte';

	export let script;

	async function clickEdit(event) {
		event.stopPropagation();
		event.preventDefault();

		const res = await showPopup({
			title: 'Archive',
			bodyMessage: 'Script will remain archived in your vault.',
			confirmButton: {
				title: 'Archive'
				// class: 'btn-danger'
			}
		});

		if (res.message == 'confirmed') {
			const fields = {
				deleted: true,
				folderId: 'root'
			};
			res.popup.isSubmitting(true);

			const resDoc = await pb.db.scripts.update(script.id, fields);
			if (resDoc.success) res.popup.hide();
		}
	}
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a on:click={clickEdit} class="dropdown-item" href="">Archive</a>
