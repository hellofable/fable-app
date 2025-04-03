import { Extension } from '@tiptap/core';
import { TextSelection, AllSelection } from 'prosemirror-state';

export const selectAll = Extension.create({
	name: 'selectAllExtension',

	addKeyboardShortcuts() {
		return {
			'Mod-a': ({ editor }) => {
				const { state, view } = editor;
				const { $from } = state.selection;
				console.log('Attempting Mod-a shortcut');

				// Find the current 'card' node at the cursor position
				let cardNode = null;
				let nodePos = null;
				state.doc.descendants((node, pos) => {
					console.log(node);

					// Check if the node is a 'card' and contains the current cursor position
					if (node.type.name === 'card' && pos <= $from.pos && pos + node.nodeSize >= $from.pos) {
						cardNode = node; // Set the found node to cardNode
						nodePos = pos;   // Capture the position of the node
						console.log('Card node found at position:', nodePos);
						return true;     // Stop traversal if card node is found
					}
					return false;
				});


				console.log(cardNode);


				if (cardNode && nodePos !== null) {
					// Calculate the selection range for text inside the 'card'
					const cardTextStart = nodePos + 2;
					const cardTextEnd = nodePos + cardNode.nodeSize - 2;

					// Determine if the whole card text is already selected
					const isCardFullySelected =
						state.selection.from === cardTextStart && state.selection.to === cardTextEnd;

					if (isCardFullySelected) {
						// If true, select the entire document on the second press
						const allSelection = new AllSelection(state.doc);
						const tr = state.tr
							.setSelection(TextSelection.create(state.doc, 2, state.doc.content.size - 2))
							.setMeta('addToHistory', false);
						console.log('Selecting entire document');
						view.dispatch(tr);
						return true;
					}

					// Select the text within the card node only
					const textSelection = TextSelection.create(state.doc, cardTextStart, cardTextEnd);
					const tr = state.tr.setSelection(textSelection).setMeta('addToHistory', false);
					console.log('Selecting text within card node');
					view.dispatch(tr);
					return true;
				}

				// // If no card node found, select the entire document
				// const allSelection = new AllSelection(state.doc);
				// const tr = state.tr.setSelection(allSelection).setMeta('addToHistory', false);
				// console.log('No card node found, selecting entire document');
				// view.dispatch(tr);
				// return true;
			}
		};
	}
});