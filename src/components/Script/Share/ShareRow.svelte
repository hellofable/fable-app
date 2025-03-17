<script>
	import { _script, _user, pb } from '$lib';
	import { onMount } from 'svelte';
	export let share;
	import Leave from './Buttons/Leave.svelte';
	import RemoveShare from './Buttons/RemoveShare.svelte';

	let sharedWith;
	let isLoading = true;
	let sharedBy = '';

	console.log(share);

	onMount(async () => {
		sharedBy = await pb.collection('user_info').getOne(share.sharedWith);
		sharedWith = sharedBy;
		isLoading = false;
	});
</script>

<tr class:d-none={isLoading}>
	<td>
		{sharedWith?.name}
		{#if $_script.ownerId !== $_user.id}
			<small> (you)</small>
		{/if} <br />
		<div class="small text-secondary">{sharedWith?.email}</div>
	</td>

	{#if sharedWith?.email !== $_user.email}
		<td class="text-end align-middle">
			<RemoveShare {sharedWith} />
		</td>
	{/if}

	{#if $_script.ownerId !== $_user.id}
		<td class="text-end align-middle">
			<Leave />
		</td>
	{/if}
</tr>
