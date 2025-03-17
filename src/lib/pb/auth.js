import { pb } from './pb';

import { _user, _app, _stripe, _scripts, _folders, _script } from '$lib';


import { PUBLIC_LANDING } from '$lib/env.js'

async function getUser() {
	_app.updateSetting('isAuthenticating', true);

	// Check if the user is already authenticated
	const user = pb.authStore.record;

	// If the user is not authenticated, clear thet store and return null
	if (!user) {
		console.log('User not authenticated');
		document.cookie = "pb_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

		_user.clear();
		_app.updateSetting('isAuthenticating', false);
		return null;
	}

	// If the user is authenticated, sub to realtime and return the user
	await subRealtime(user);

	if (user?.id)

		setTimeout(() => {
			_app.updateSetting('isAuthenticating', false);

		}, 1000);




	document.cookie = pb.authStore.exportToCookie({ httpOnly: false });

	return user;
}

async function logout() {
	// hide the login screen immediately
	_app.updateSetting('isAuthenticating', true);

	// clear the auth store and user store
	pb.authStore.clear();

	// clear the cookie
	document.cookie = "pb_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

	// reload the page
	window.location.href = PUBLIC_LANDING;



}

async function subRealtime(user) {
	// Fetch the user record
	try {
		const dbUser = await pb.collection('users').getOne(user.id);
		if (dbUser) _user.set(dbUser);
	} catch (error) {
		// If there is no user, logout to be safe
		console.error('Error fetching user record:', error);
		return pb.auth.logout();
	}

	// Subscribe to the user record
	try {
		await pb.collection('users').unsubscribe(); // remove all subscriptions in the collection
		await pb.collection('users').subscribe(user.id, function (e) {
			if (e.delete) {
				pb.auth.logout();
				return;
			}
			if (e.record) _user.set(e.record);
		});
	} catch (error) {
		console.error('Error subscribing to user record:', error);
	}

	// Fetch the user's stripe customer record
	try {

		const record = await pb.db.stripe.getCustomerById(user.customerId);
		if (record) _stripe.set(record);

		if (!record) return;

		// Subscribe to the stripe customer record
		await pb.collection('stripe').unsubscribe(); // remove all subscriptions in the collection
		await pb.collection('stripe').subscribe(record.id, function (e) {
			if (e.record) _stripe.set(e.record);
		});
	} catch (error) {
		console.error('Error fetching stripe customer record:', error);
	}

	// sub to all scripts
	try {
		// Fetch all scripts
		const records = await pb.db.scripts.get();

		_scripts.set(records);

		// Subscribe to all scripts
		await pb.collection('scripts').unsubscribe();

		await pb.collection('scripts').subscribe('*', async (e) => {
			const records = await pb.db.scripts.get();
			_scripts.set(records);

			console.log(records);

			// Check if the action is 'update' and the record ID matches the scriptId in the page params
			// if (e.action === 'update' && e.record.id === get(page).params.scriptId) {
			// 	_script.set(e.record);
			// }
		});
	} catch (error) {
		console.error('Error fetching scripts :', error);
	}

	// sub to all folders
	try {
		const records = await pb.db.folders.get()
		_folders.set(records);

		await pb.collection('folders').unsubscribe(); // remove all subscriptions in the collection
		await pb.collection('folders').subscribe('*', async (e) => {
			const records = await pb.db.folders.get()
			console.log('folders', records);
			_folders.set(records);
		});
	} catch (error) {
		console.error('Error fetching folders :', error);
	}
}

// Create the auth object
const auth = {
	getUser,
	logout
};

// Export the auth object
export { auth };
