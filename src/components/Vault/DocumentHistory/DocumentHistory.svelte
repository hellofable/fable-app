<script>
	import { pbCheckpoints } from '$lib';
	import { dateFormat } from '$lib';
	import RestoreButton from './Buttons/RestoreButton.svelte';
	import DeleteButton from './Buttons/DeleteButton.svelte';

	export let isCollapsed;
	export let script;
	let isLoading = false;

	let items = [];
	let onLastPage = false;

	$: if (!isCollapsed) {
		getRecent();
	} else {
		items = [];
		currentPage = 1;
		onLastPage = false;
	}

	async function getRecent() {
		isLoading = true;
		const newItems = await pbCheckpoints.getBackups(script.id, currentPage, 5);
		items = newItems;
		isLoading = false;
	}

	let currentPage = 1;
	async function getOlder() {
		isLoading = true;
		const newItems = await pbCheckpoints.getBackups(script.id, currentPage, 5);
		const hasMore = await pbCheckpoints.getBackups(script.id, currentPage, 6);

		if (currentPage === 1) {
			items = newItems;
		} else {
			items = [...items, ...newItems];
		}
		if (!hasMore.length) {
			onLastPage = true;
		}
		isLoading = false;
	}

	function getNextPage() {
		currentPage++;
		getOlder();
	}
</script>

<div class="px-3 pb-3 small">
	{#each items as item (item.id)}
		<div class="backup" id="backup-{item.id}">
			<a href="/scripts?backupId={item.id}" role="button" class="text-muted"
				>{dateFormat(item.created)}</a
			>
		</div>
	{/each}
	<div class="d-flex w-100 align-items-end mt-2">
		<div class="flex-grow-1">
			<a
				on:click={getNextPage}
				href=""
				class:disabled={onLastPage || items.length === 0}
				class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover small mt-2 opacity-75"
			>
				{#if onLastPage}
					No more backups
				{:else if items.length}
					{#if isLoading}
						<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
					{:else}
						Load more
					{/if}
				{:else if isLoading}
					<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
				{:else}
					No Backups
				{/if}
			</a>
		</div>

		<div class="opacity-75">
			<RestoreButton {script} />
			<DeleteButton {script} />
		</div>
	</div>
</div>

<style>
	.backup a {
		text-decoration: none;
		cursor: pointer;
	}

	.backup a:hover {
		text-decoration: underline;
	}

	.disabled {
		pointer-events: none !important;
		color: grey !important;
		text-decoration: none !important;
	}
</style>
