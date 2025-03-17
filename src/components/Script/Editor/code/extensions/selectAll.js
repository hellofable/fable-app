import { Extension } from '@tiptap/core';
import { TextSelection, AllSelection } from 'prosemirror-state';

export const selectAll = Extension.create({
	name: 'selectAllExtension',

	addKeyboardShortcuts() {
		return {
			'Mod-a': ({ editor }) => {
				const { state, view } = editor;
				const { $from } = state.selection;
				console.log('select all');

				// Find the current card node at the cursor
				let cardNode = null;
				let nodePos = null;
				state.doc.descendants((node, pos) => {
					if (node.type.name === 'card' && pos <= $from.pos && pos + node.nodeSize >= $from.pos) {
						cardNode = node;
						nodePos = pos;
						return true;
					}
					return false;
				});

				if (cardNode && nodePos !== null) {
					// Define the text selection range within the card
					const cardTextStart = nodePos + 2;
					const cardTextEnd = nodePos + cardNode.nodeSize - 2;

					// Check if the current selection already covers all text within the card
					const isCardFullySelected =
						state.selection.from === cardTextStart && state.selection.to === cardTextEnd;

					if (isCardFullySelected) {
						// Select the entire document on the second Mod-a press
						const allSelection = new AllSelection(state.doc);
						const tr = state.tr
							.setSelection(TextSelection.create(state.doc, 2, state.doc.content.size - 2))
							.setMeta('addToHistory', false);
						view.dispatch(tr);
						return true;
					}

					// Select only the text inside the card node
					const textSelection = TextSelection.create(state.doc, cardTextStart, cardTextEnd);
					const tr = state.tr.setSelection(textSelection).setMeta('addToHistory', false);
					view.dispatch(tr);
					return true;
				}

				// // If no card node, select the entire document
				// const allSelection = new AllSelection(state.doc);
				// const tr = state.tr.setSelection(allSelection).setMeta('addToHistory', false);

				// view.dispatch(tr);
				return true;
			}
		};
	}
});
