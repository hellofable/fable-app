<script>
	export let script;
	import { pb, _user, showPopup, toast } from '$lib';

	async function click() {
		console.log('delete button clicked');

		// const updatedData = {
		// 	deleted: false,
		// 	folderId: 'root'
		// };
		// const updatedRecord = await pb.collection('scripts').update(script.id, updatedData);

		const res = await showPopup({
			title: 'Delete Script',
			bodyMessage: `Script and all backups for <span class="text-primary-emphasis fw-bold">${script.title}</span> will be deleted forever.`,
			confirmButton: {
				title: 'Delete Forever',
				class: 'btn-danger'
			}
		});

		if (res.message == 'confirmed') {
			res.popup.isSubmitting(true);

			const resDoc = await pb.db.scripts.remove(script.id);
			if (resDoc.success) res.popup.hide();
		}
	}
</script>

<a
	class:d-none={$_user?.settings?.vault?.deleteProtect || !script?.deleted}
	on:click={click}
	href=""
	class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover small ms-2"
>
	Delete
</a>
