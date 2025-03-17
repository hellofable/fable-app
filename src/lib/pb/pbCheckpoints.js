import PocketBase from 'pocketbase';


import { PUBLIC_PB_CHECKPOINTS } from '$lib/env.js'

const db = new PocketBase(PUBLIC_PB_CHECKPOINTS);
window.pb_checkpoints = pb;

async function getBackups(scriptId, page, limit) {
	try {
		const checkpointResult = await db.collection('checkpoints_info').getList(page, limit, {
			filter: `scriptId="${scriptId}"`,
			sort: '-created'
		});
		return checkpointResult.items;
	} catch (error) {
		console.error('Error fetching items', error);
		throw error;
	}
}

async function removeCheckpoint({ docId }) {
	const token = pb.authStore.token;

	if (!token || !docId) {
		console.error('Missing required data for removing checkpoint.');
		return { success: false, message: 'Missing required data' };
	}

	try {
		const response = await fetch('/api/deleteCheckpoint', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ docId })
		});

		const result = await response.json();

		if (!response.ok) {
			throw new Error(result.message || 'Failed to share script');
		}

		return result;
	} catch (error) {
		console.error('Error removing checkpoint:', error.message);
		return { success: false, message: error.message };
	}
}

async function get({ docId }) {
	const token = pb.authStore.token;


	if (!token || !docId) {
		console.error('Missing required data for getting checkpoint.');
		return { success: false, message: 'Missing required data' };
	}

	try {
		const response = await fetch('/api/checkpoints/get', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ docId })
		});

		const result = await response.json();






		if (!response.ok) {
			throw new Error(result.message || 'Failed to share script');
		}

		return result;
	} catch (error) {
		console.error('Error getting checkpoint:', error.message);
		return { success: false, message: error.message };
	}
}

export const pbCheckpoints = {
	db,
	getBackups,
	removeCheckpoint,
	get
};

window.pbCheckpoints = pbCheckpoints;
