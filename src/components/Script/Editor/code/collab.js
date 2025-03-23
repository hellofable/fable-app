import { PUBLIC_HP } from '$lib/env.js'
import { _app, pb, _script, _editor } from '$lib';
import * as Y from 'yjs';
import { HocuspocusProvider } from '@hocuspocus/provider';

export async function collab(scriptId) {
	const ydoc = new Y.Doc();

	// Initialize the Hocuspocus provider...
	const token = pb.authStore.token;
	const provider = new HocuspocusProvider({
		url: PUBLIC_HP,
		// url: 'ws://localhost:8300',
		name: scriptId,
		document: ydoc,
		token,
		onAuthenticationFailed: (error) => {
			// alert('Authentication failed:', error);
		}
	});

	provider.on('status', ({ status }) => {
		_app.updateSetting('server.hp.status', status);
	});


	return { provider, ydoc };
}
