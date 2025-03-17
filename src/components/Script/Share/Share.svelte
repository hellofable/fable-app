<script>
	import { _script, _user } from '$lib';
	import { _shares, _modal } from '$lib';
	import { onMount } from 'svelte';

	import ShareRow from './ShareRow.svelte';
	import NewShare from './NewShare/NewShare.svelte';

	$: if ($_user.id != $_script?.ownerId) $_modal.params.buttons = {};

	let sharedBy = '';
	let isLoading = true;
	onMount(async () => {
		sharedBy = await pb.collection('user_info').getOne($_script.ownerId);
		isLoading = false;
	});

	$: if ($_user.id == $_script.ownerId) {
		$_modal.params.titleBadge = {
			text: 'Document Owner',
			color: 'primary'
		};
	}

	$: if ($_user.id != $_script.ownerId) {
		$_modal.params.titleBadge = {
			text: 'collaborator',
			color: 'secondary'
		};
	}
</script>

{#if $_user.id == $_script.ownerId}
	<div class="alert alert-info d-none">You are the owner of this script.</div>
{/if}

{#if $_user.id != $_script.ownerId && !isLoading}
	<div class="alert alert-secondary border-0">
		Script is owned by {sharedBy.name}
	</div>
{/if}

{#if $_script && $_script?.shares?.length}
	<table class="table table-hover table-borderless">
		<thead>
			<tr class="border-bottom">
				<th>Shared With</th>
				<th></th>
			</tr>
		</thead>
		<tbody>
			{#each $_script.shares as share}
				<ShareRow {share} />
			{/each}
		</tbody>
	</table>
{/if}

{#if $_user.id == $_script.ownerId}
	<NewShare />
{/if}

<style>
	.alert {
		opacity: 0.5;
	}
</style>
