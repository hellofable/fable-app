import { Extension } from '@tiptap/core';
import { TextSelection } from 'prosemirror-state';

export const dontSplitOnEnter = Extension.create({
	name: 'dontSplitOnEnter',

	addKeyboardShortcuts() {
		return {
			Enter: ({ editor }) => {
				const { state, view } = editor;
				const { $from } = state.selection;

				// Ensure view is defined before proceeding
				if (!view) return false;

				// Check if the cursor is within a `<line>` inside a `<card>`
				const isInsideCardLine =
					$from.node(-1).type.name === 'card' && $from.node().type.name === 'line';

				if (!isInsideCardLine) return false; // Allow default behavior outside <card>

				// Check if the current `<line>` is empty
				const currentLineText = $from.parent.textContent.trim();
				if (currentLineText === '') {
					// If on an empty line, insert a new `<line>` below
					const newLine = state.schema.nodes.line.create();
					const posAfterCurrentLine = $from.after(); // Position after the current `<line>`

					// Create a transaction to insert the new line
					let transaction = state.tr.insert(posAfterCurrentLine, newLine);

					// Update the transaction with a selection set to the start of the new line
					transaction = transaction
						.setSelection(TextSelection.create(transaction.doc, posAfterCurrentLine + 1))
						.scrollIntoView();

					transaction.setMeta('addToHistory', false); // Prevent adding to the undo history

					view.dispatch(transaction);
					return true; // Custom handling complete
				}

				// If the current `<line>` is not empty, allow the default Enter behavior
				return false;
			}
		};
	}
});
