<script>
	import SignOutButton from './SignOutButton.svelte';
	import { _user } from '$lib';

	let initials = '';

	$: initials = getInitials($_user.name);

	function getInitials(name) {
		if (!name) return '';
		let parts = name.trim().split(/\s+/);
		let firstInitial = parts[0][0].toUpperCase();
		let lastInitial = parts.length > 1 ? parts[parts.length - 1][0].toUpperCase() : '';
		return firstInitial + lastInitial;
	}
</script>

<div class="card w-100 mb-2">
	<div class="card-body">
		<div class="d-flex align-items-center">
			<!-- Circle with initials -->

			<!-- Text Content -->
			<div class="me-2" style="flex: 1; min-width: 0;">
				<h5 class="card-title mb-1 text-break">{$_user.name}</h5>
			</div>
			<div
				class="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
				style="width: 50px; height: 50px; font-size: 1.5rem; font-weight: bold; flex-shrink: 0;"
			>
				{initials}
			</div>
		</div>
		<p class="card-text mb-0 text-break text-secondary small text-start mt-1">
			{$_user.email}
		</p>

		<div class="text-end text-secondary mt-2 d-none">
			<a class="small" href="">(edit)</a>
		</div>
		<SignOutButton />
	</div>
</div>

<style>
	.card {
		border: 0;
	}
</style>
