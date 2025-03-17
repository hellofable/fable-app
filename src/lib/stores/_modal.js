// _modal.js
import { writable } from 'svelte/store';

function createModalStore() {
	const { subscribe, set, update } = writable({});

	return {
		subscribe,
		set,
		open(Component, params = {}) {
			set({ show: true, Component, params });
		},
		close() {
			set({ show: false, Component: null, params: {} });
		}
	};
}

export const _modal = createModalStore();
