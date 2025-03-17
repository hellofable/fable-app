import { PUBLIC_AI } from '$lib/env.js'

import { router } from 'tinro';
import { _app } from '$lib';
import { pb } from '$lib';
export function listenForIframeMessages() {
	if (window.__iframeListenerAdded) return; // Prevent duplicate listeners

	window.__iframeListenerAdded = true; // Flag to mark listener as added

	window.addEventListener('message', async function (event) {
		console.log(event.origin);

		// Only accept messages from the iframe's origin (ai-dev)
		if (event.origin !== PUBLIC_AI && event.origin !== 'https://ai-dev.hellofable.com') {
			console.warn('⛔ Blocked message from unknown origin:', event.origin);
			return;
		}

		if (event.data?.action === 'sendScript') {
			const res = await pb.db.scripts.insert(event.data.payload);

			_app.updateSetting('storybuilder.show', false);
			setTimeout(() => {
				router.goto('/scripts');
			}, 500);
		}

		if (event.data?.action === 'close') {
			_app.updateSetting('storybuilder.show', false);
			setTimeout(() => {
				router.goto('/scripts');
			}, 500);
		}
	});
}
