<script>
	import { pb, _app } from '$lib';
	import Swal from 'sweetalert2';
	import LoginWithGoogleButton from './LoginWithGoogleButton.svelte';
	import fableLogo from '/src/assets/fable-logo-black.png';

	let email = '';
	let error = '';
	let success = '';
	let submitted;

	async function requestOtpFromUser() {
		const { value: code } = await Swal.fire({
			title: 'Check your email',
			text: 'A verification code has been sent to your email address.',
			input: 'text',
			inputPlaceholder: 'Enter login code',
			confirmButtonColor: '#0d6efd',
			confirmButtonText: 'Continue',
			allowOutsideClick: false
		});
		return code || null;
	}

	async function authenticateWithOtp(otpId, code) {
		try {
			// Authenticate using the OTP code and OTP ID
			return await pb.collection('users').authWithOTP(otpId, code);
		} catch (e) {
			if (e.status === 400) {
				throw new Error('Incorrect code');
			} else {
				throw e; // Propagate other errors
			}
		}
	}

	const login = async () => {
		submitted = true;
		try {
			// Request OTP and obtain otpId
			const result = await pb.collection('users').requestOTP(email);
			const otpId = result.otpId;

			while (true) {
				const code = await requestOtpFromUser();

				if (!code) {
					error = 'OTP input was cancelled by user';
					submitted = false;
					return;
				}

				try {
					await authenticateWithOtp(otpId, code);
					success = 'Authenticated successfully!';
					error = '';
					pb.auth.getUser();
					return;
				} catch (e) {
					if (e.message === 'Incorrect code') {
						await Swal.fire({
							title: 'That was not the correct code',
							text: 'Please try again or request a new code.',
							confirmButtonColor: '#3085d6',
							confirmButtonText: 'Continue'
						});
					} else {
						error = e.message;
						submitted = false;
						return;
					}
				}
			}
		} catch (e) {
			// Handle any errors in requesting the OTP
			error = `Failed to request OTP: ${e.message}`;
			submitted = false;
		}
	};

	async function loginWithGoogle() {
		const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });

		// after the above you can also access the auth data from the authStore
		console.log(pb.authStore.isValid);
		console.log(pb.authStore.token);
		console.log(pb.authStore.record.id);
	}
</script>

<div class:d-none={submitted || $_app.isAuthenticating} class="container">
	<div class="d-flex align-items-center justify-content-center">
		<div class="me-2"><img class="logo" src={fableLogo} alt="Fable" /></div>
		<div class="fs-3">Sign In</div>
	</div>
	<form on:submit|preventDefault={login} class="mt-4">
		<div class="mb-3">
			<input
				type="email"
				class="form-control"
				id="email"
				bind:value={email}
				placeholder="Enter your email"
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
		<button type="submit" class="btn btn-primary w-100">Get Code</button>
	</form>

	<LoginWithGoogleButton />
</div>

<style>
	.container {
		max-width: 400px;
		margin-top: 20vh;
	}
	.logo {
		opacity: 0.8;
		width: 30px;
	}
</style>
