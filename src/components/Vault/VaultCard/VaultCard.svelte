<script>
	export let script;
	import moment from 'moment';
	import { _modal } from '$lib';
	import ValutCardCollapse from './ValutCardCollapse.svelte';
	import DocumentHistory from '../DocumentHistory/DocumentHistory.svelte';

	let isCollapsed = true;
</script>

<div class="vault-card card border-0 mb-1">
	<div class="card-header border-0 pt-2 ps-2 w-100 d-flex align-items-center">
		<ValutCardCollapse bind:isCollapsed {script} />
		<div class="script-title small flex-grow-1">
			<button
				class="script-title btn btn-link p-0 m-0 text-left"
				on:click={() => (isCollapsed = !isCollapsed)}
			>
				{script.title}
			</button>
		</div>
		<div class="script-number fst-italic text-end">
			id {script.scriptNumber}
		</div>
	</div>
	<div class="mt-2" class:d-none={isCollapsed}>
		<DocumentHistory bind:isCollapsed {script} />
	</div>
</div>

<style>
	.card {
		width: 280px;
	}

	.script-number {
		font-size: 9px;
		opacity: 0.7;
		width: 50px;
	}

	.script-title {
		text-align: start !important;
		color: unset !important;
		overflow: hidden;
		line-height: 1.1;
	}
</style>
