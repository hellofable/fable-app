import { Extension } from '@tiptap/core';
import { TextSelection, AllSelection } from 'prosemirror-state';
import { findParentNode } from 'prosemirror-utils';


export const selectAll = Extension.create({
	name: 'selectAllExtension',

	addKeyboardShortcuts() {
		return {
			'Mod-a': ({ editor }) => {
				const { state, view } = editor;
				const { $from } = state.selection;



				// Define the predicate to find a blockquote node
				const predicate = node => node.type === state.schema.nodes.card;

				// Use findParentNode with the predicate and the current selection
				const parent = findParentNode(predicate)(state.selection);
				const cardNode = parent ? parent.node : null;
				const nodePos = parent ? parent.pos : null;



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



				return true

			}
		};
	}
});