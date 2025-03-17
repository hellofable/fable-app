import { _app } from '$lib';

let previousState;

// this updates the app settings from local storage
// it also updates the local storage when the app settings change

export function setAppSettingsFromLocal() {
	updateLocalAppSettings();
	_app.subscribe((currentState) => {
		if (!previousState) {
			previousState = JSON.parse(JSON.stringify(currentState)); // Deep copy
			return;
		}

		const changedKeys = [];

		// Check for changes
		for (const key in currentState) {
			if (JSON.stringify(currentState[key]) !== JSON.stringify(previousState[key])) {
				changedKeys.push(key);
			}
		}

		// Log changed keys
		if (changedKeys.length > 0) {
			// console.log('Changed keys:', changedKeys);
		}

		if (
			changedKeys.includes('view') ||
			changedKeys.includes('sidebar') ||
			changedKeys.includes('scriptsSidebar')
		) {
			window.localStorage.setItem('appConfig', JSON.stringify(_app.get()));
		}

		// Update previous state
		previousState = JSON.parse(JSON.stringify(currentState)); // Deep copy
	});
}

function updateLocalAppSettings() {
	const appConfig = JSON.parse(window.localStorage.getItem('appConfig'));

	const app = _app.get();
	if (app?.currentCard === undefined || !appConfig) return;

	if (app == {}) return;
	// Run _app.updateSetting for each item
	_app.updateSetting('view.dark', appConfig.view.dark);
	_app.updateSetting('sidebar.show', appConfig.sidebar.show);
	_app.updateSetting('scriptsSidebar.show', appConfig.scriptsSidebar.show);
	_app.updateSetting(
		'scriptsSidebar.bottomButtons.selected',
		appConfig.scriptsSidebar.bottomButtons.selected
	);
	_app.updateSetting(
		'scriptsSidebar.vault.showOptions',
		appConfig.scriptsSidebar.vault.showOptions
	);
}
