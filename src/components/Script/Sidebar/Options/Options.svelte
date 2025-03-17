<script>
	export let _app;
	import OptionsToggle from './OptionsToggle.svelte';
	import OptionsControls from './OptionsControls.svelte';
</script>

<div class="options-wrapper mx-2 rounded-top border-0 shadow">
	<OptionsControls {_app} />
	<OptionsToggle {_app} />
</div>

<style>
	.options-wrapper {
		position: fixed;
		line-height: 1;
		bottom: -3px;
		width: 387px;
	}
</style>
