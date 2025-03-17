import { writable, get } from 'svelte/store';

function createScriptsStore() {
	const { subscribe, set } = writable([]);

	return {
		subscribe,
		set,
		get() {
			return get({ subscribe });
		}
	};
}

export const _script = createScriptsStore();
