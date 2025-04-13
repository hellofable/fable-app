import { _editor, _app } from '$lib';

export async function clickCard(lineId, cardId) {
	const element = document.getElementById(lineId);
	await scrollToCard(element);
	// flashLine(lineId)
	_app.updateSetting('currentCard.id', cardId);
}

export function scrollToCardById(cardId, behavior = 'auto') {
	setTimeout(() => {
		const element = document.getElementById(cardId);
		scrollToCard(element, behavior);
	}, 0);
}

function scrollToCard(element, behavior = 'smooth') {
	const containerElement = document.getElementById('editor-wrapper');

	if (element && containerElement) {

		const offset = 100;
		const elementTop = element.getBoundingClientRect().top;
		const containerTop = containerElement.getBoundingClientRect().top;
		const scrollPosition = containerElement.scrollTop + (elementTop - containerTop) - offset;

		// Check if already in position
		if (Math.abs(containerElement.scrollTop - scrollPosition) < 1) {
			return Promise.resolve();
		}

		containerElement.scrollTo({
			top: scrollPosition,
			behavior: behavior
		});

		// Return a promise that resolves when scrolling stops
		return new Promise((resolve) => {
			let scrollTimeout;
			const handleScroll = () => {
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(() => {
					containerElement.removeEventListener('scroll', handleScroll);
					resolve(); // Resolve the promise when scrolling stops
				}, 75);
			};

			containerElement.addEventListener('scroll', handleScroll);
		});
	}
}

export function flashLine(lineId) {
	function addClass() {
		const editor = _editor.get();
		const { state, view } = editor;
		const { schema } = state;
		const element = document.getElementById(lineId);
		const pos = element.pmViewDesc.posAtStart - 1;

		// Create a transaction to remove the class
		const tr = state.tr.setNodeMarkup(pos, schema.nodes.line, {
			...state.doc.nodeAt(pos).attrs,
			class: 'flash-line'
		});
		view.dispatch(tr);
	}

	function removeClass() {
		setTimeout(() => {
			const editor = _editor.get();
			const { state, view } = editor;
			const { schema } = state;
			const element = document.getElementById(lineId);
			const pos = element.pmViewDesc.posAtStart - 1;

			view.dispatch(state.tr.setMeta('forceUpdate', Date.now()));

			// Create a transaction to remove the class
			const tr = state.tr.setNodeMarkup(pos, schema.nodes.line, {
				...state.doc.nodeAt(pos).attrs,
				class: null
			});
			view.dispatch(tr);
		}, 1000);
	}

	addClass();
	removeClass();
}
