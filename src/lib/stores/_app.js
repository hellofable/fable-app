// src/stores/appStore.js
import { writable, get } from 'svelte/store';

const settings = {
	isAuthenticating: false,
	isLoadingBackup: true,
	isLoadingScript: false,
	scripts: {
		showScripts: true,
		showShared: true
	},
	scriptsSidebar: {
		show: true,
		bottomButtons: {
			selected: 'Account'
		},
		vault: {
			showOptions: false
		}
	},
	sidebar: {
		show: true,
		options: {
			show: true,
			values: {
				sceneNumbers: true,
				sceneHeaders: true,
				sectionHeaders: true,
				notes: true,
				synopses: true,
				hideIntExt: false,
				hideDayNight: false,
				characters: true
			}
		},
		cardInfo: {
			show: false
		}
	},
	view: {
		mode: 'cards',
		dark: false,
		hideNonPrinting: false,
	},
	currentCard: {
		id: null
	},
	server: {
		hp: {
			status: 'disconnected'
		}
	}
};

function createAppStore() {
	const { subscribe, set, update } = writable(settings);

	function updateNestedSetting(obj, path, value) {
		// console.log({ obj, path, value });
		// return
		const keys = path.split('.');
		const lastKey = keys.pop();
		const deepObj = keys.reduce((acc, key) => (acc[key] = acc[key] || {}), obj);
		deepObj[lastKey] = value;
	}

	return {
		subscribe,
		get: () => get(_app),
		set,
		update,
		updateSetting: (path, value) =>
			update((settings) => {
				const newSettings = { ...settings };
				updateNestedSetting(newSettings, path, value);
				return newSettings;
			})
	};
}

export const _app = createAppStore();
