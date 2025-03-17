// src/stores/userStore.js
import { writable, get } from 'svelte/store';

const initialSettings = {
	name: null,
	email: null,
	settings: {}
};

function createUserStore() {
	const { subscribe, set, update } = writable(initialSettings);

	return {
		subscribe,
		set,
		get: function () {
			return get(_user);
		},
		clear: function () {
			set(initialSettings); // Reset the store to initial settings
		}
	};
}

export const _user = createUserStore();
