import { PUBLIC_PB } from '$lib/env.js'
import { SECRET_PB_USER, SECRET_PB_PASS } from '$lib/server/env.js'

import PocketBase from 'pocketbase';
import message from 'paco/dist/commands/options/message';

const pb = new PocketBase(PUBLIC_PB);
await pb.collection('_superusers').authWithPassword(SECRET_PB_USER, SECRET_PB_PASS);

export async function validateUserToken({ token }) {
	try {
		const response = await pb.send('/api/collections/users/auth-refresh', {
			method: 'POST',
			body: {},
			headers: {
				Authorization: token
			}
		});

		if (!response.record) return { success: false, message: 'Invalid token' };


		const data = {
			user: response.record,
			pb
		}

		return { success: true, data };
	} catch (error) {
		console.log('Token is invalid:', error);
		return { success: false, message: 'cant refresh token' };

	}
}
