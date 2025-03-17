<script>
	import { pb } from '$lib/pb';

	let email = '';
	let password = 'asdasdasd';
	let error = '';
	let success = '';

	const login = async () => {
		pb.auth.login(email, password);
	};
</script>

<div class="container">
	<h2 class="text-center">Login</h2>
	<form on:submit|preventDefault={login} class="mt-4">
		<div class="mb-3">
			<label for="email" class="form-label">Email address</label>
			<input
				type="email"
				class="form-control"
				id="email"
				bind:value={email}
				placeholder="Enter your email"
				required
			/>
		</div>
		<div class="mb-3">
			<label for="password" class="form-label">Password</label>
			<input
				type="password"
				class="form-control"
				id="password"
				bind:value={password}
				placeholder="Enter your password"
				required
			/>
		</div>
		{#if error}
			<div class="alert alert-danger" role="alert">
				{error}
			</div>
		{/if}
		{#if success}
			<div class="alert alert-success" role="alert">
				{success}
			</div>
		{/if}
		<button type="submit" class="btn btn-primary w-100">Login</button>
	</form>

	<button on:click={() => (email = 'demian.leclair@gmail.com')}>DL </button>
	<button on:click={() => (email = 'demian.dakota@gmail.com')}>DD </button>
</div>

<style>
	.container {
		max-width: 400px;
		margin-top: 20vh;
	}
</style>
