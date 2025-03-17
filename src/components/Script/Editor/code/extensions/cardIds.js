import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';

export const cardIds = Extension.create({
	name: 'cardId',

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: new PluginKey('cardIdPlugin'),

				appendTransaction: (transactions, oldState, newState) => {
					return updateLineIds(transactions, oldState, newState);
				}
			})
		];
	}
});

function updateLineIds(transactions, oldState, newState) {
	let hasChanges = false;
	const tr = newState.tr;
	const seenIds = new Set(); // To track already seen IDs

	// Traverse the document's nodes
	newState.doc.descendants((node, pos) => {
		if (node.type.name === 'card') {
			// If the card already has an ID, check for duplicates
			if (node.attrs.id) {
				if (seenIds.has(node.attrs.id)) {
					// Duplicate found, generate a new unique ID
					const newId = generateUniqueId();
					// console.log(`Duplicate id ${node.attrs.id} found, assigning new id ${newId}`);
					tr.setNodeMarkup(pos, null, {
						...node.attrs,
						id: newId
					});
					hasChanges = true;
				} else {
					// Mark the id as seen
					seenIds.add(node.attrs.id);
				}
			} else {
				// If the card has no ID, generate one
				const newId = generateUniqueId();
				// console.log(`Setting id ${newId} for card node at position ${pos}`);
				tr.setNodeMarkup(pos, null, {
					...node.attrs,
					id: newId
				});
				hasChanges = true;
			}
		}
	});

	// Only return the transaction if changes were made
	return hasChanges ? tr : null;
}

function generateUniqueId() {
	return `card-${Math.random().toString(36).slice(2, 11)}`;
}
