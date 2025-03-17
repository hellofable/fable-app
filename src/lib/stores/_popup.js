import { writable, get } from 'svelte/store';

function createStore() {
	const { subscribe, set, update } = writable([]);

	return {
		update,
		subscribe,
		set,
		get() {
			return get({ subscribe });
		}
	};
}

export const _popup = createStore();
