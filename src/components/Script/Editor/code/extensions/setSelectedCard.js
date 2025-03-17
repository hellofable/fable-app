import { Extension } from '@tiptap/core';
import { _app, _cards } from '$lib';
import { getCardNodeAtPos } from '../formatCard/';

export const setSelectedCard = Extension.create({
	name: 'setSelectedCard',

	onSelectionUpdate({ editor }) {
		const { state } = editor;
		const { from } = state.selection; // Starting position of the selection

		// Get the card node directly at the selection position

		const result = getCardNodeAtPos(from);
		if (!result) return;
		const { node } = result;

		if (node) {
			const currentCardId = _app.get().currentCard.id;

			// Update only if the selected card has changed
			if (currentCardId !== node.attrs.id) {
				_app.updateSetting('currentCard.id', node.attrs.id);
			}
		} else {
			console.log('No parent card node found.');
		}
		return false;
	}
});
