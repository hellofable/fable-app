<script>
	import { _modal, _folders } from '$lib';
	import Form from '/src/components/Other/Form.svelte';
	export let folder;

	function clickEdit(event) {
		const folderIsEmpty = _folders.isFolderEmpty(folder.id);

		if (!folderIsEmpty) {
			_modal.open(null, {
				title: 'Folder Not Empty',
				bodyMessage: 'Only empty folders can be deleted.',
				buttons: {}
			});
			return;
		}

		event.stopPropagation();
		event.preventDefault();

		_modal.open(Form, {
			title: 'Delete Folder',
			bodyMessage: 'Are you sure you want to delete this folder?',
			buttons: {
				submit: {
					title: 'Delete',
					class: 'btn-danger',
					showLabel: false
				}
			},
			componentProps: {
				fields: [],
				onSubmit: async (data) => {
					$_modal.isSubmitting = true;

					const res = await pb.db.folders.remove(folder.id);

					if (!res.success) {
						console.log(res);

						console.error('Error deleting folder:', { message: res.message }); // Debugging
						$_modal.isSubmitting = false;
						alert(res.message);
						_modal.close();
						return;
					}

					_modal.close();
				}
			}
		});
	}
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a on:click={clickEdit} class="dropdown-item" href="">Delete Folder</a>
