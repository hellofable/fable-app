import { _app } from '$lib';

export const setBodyClasses = () => {


	_app.subscribe((currentValue) => {
		if (currentValue.scriptsSidebar.show) {
			window.document.body.classList.remove('scripts-sidebar-closed');
			window.document.body.classList.add('scripts-sidebar-open');
		} else {
			window.document.body.classList.add('scripts-sidebar-closed');
			window.document.body.classList.remove('scripts-sidebar-open');
		}

		if (currentValue.sidebar.show) {
			window.document.body.classList.remove('sidebar-closed');
			window.document.body.classList.add('sidebar-open');
		} else {
			window.document.body.classList.add('sidebar-closed');
			window.document.body.classList.remove('sidebar-open');
		}

		if (currentValue.sidebar.options.values.sceneNumbers) {
			window.document.body.classList.add('show-sceneNumbers');
		} else {
			window.document.body.classList.remove('show-sceneNumbers');
		}


		if (currentValue.view.hideNonPrinting) {
			window.document.body.classList.add('hide-non-printing');

		} else {
			window.document.body.classList.remove('hide-non-printing');
		}


		if (currentValue.view.mode == 'script') {
			window.document.body.classList.remove('view-cards');
			window.document.body.classList.add('view-script');
			window.document.body.classList.remove('view-text');
		}
		if (currentValue.view.mode == 'cards') {
			window.document.body.classList.add('view-cards');
			window.document.body.classList.remove('view-script');
			window.document.body.classList.remove('view-text');
		}
		if (currentValue.view.mode == 'text') {
			window.document.body.classList.add('view-text');
			window.document.body.classList.remove('view-script');
			window.document.body.classList.remove('view-cards');
		}

		if (currentValue.view.dark) {
			document.documentElement.setAttribute('data-bs-theme', 'dark');

			window.document.body.classList.add('dark');
			window.document.body.classList.remove('light');
		} else {
			document.documentElement.setAttribute('data-bs-theme', 'light');

			window.document.body.classList.add('light');
			window.document.body.classList.remove('dark');
		}

		const sidecardsElement = document.getElementById('sidecards');
		if (sidecardsElement) {
			// Remove all previous hide-* classes
			Object.keys(currentValue.sidebar.options.values).forEach((key) => {
				sidecardsElement.classList.remove(`hide-${key}`);
			});
			// Add classes based on current values
			Object.entries(currentValue.sidebar.options.values).forEach(([key, value]) => {
				if (!value) {
					sidecardsElement.classList.add(`hide-${key}`);
				}
			});
		}
	});
};



export const setPageTitle = (url) => {
	const path = url.split('/')[1]?.split('?')[0]; // Remove query parameters

	if (!path) return;

	// Remove all classes starting with "page-"
	document.body.classList.forEach((cls) => {
		if (cls.startsWith('page-')) document.body.classList.remove(cls);
	});

	// Add the new class based on the current path
	document.body.classList.add(`page-${path}`);
};