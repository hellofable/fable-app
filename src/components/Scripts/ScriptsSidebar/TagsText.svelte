<script>
	import { _app } from '$lib';
	function clickTags() {
		_app.updateSetting('modal', {
			template: 'TagsModal',
			show: true,
			title: 'Script Tags'
		});
	}
</script>

<ProjectSelector />
