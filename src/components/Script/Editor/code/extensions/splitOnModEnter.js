import { Extension } from '@tiptap/core';
import { splitBlock } from 'prosemirror-commands';

export const splitOnModEnter = Extension.create({
	name: 'splitOnModEnter',

	addKeyboardShortcuts() {
		return {
			'Mod-Enter': ({ editor }) => {
				const { state, view } = editor;
				if (!view) return false; // Ensure the view is available

				// // Use 'view.dispatch' directly in the call to 'splitBlock'
				// const didSplit = splitBlock(state, view.dispatch);

				// return didSplit; // Return true if the command executed
			}
		};
	}
});

function getPos() {
	const { state, view } = editor;
	const { $from } = state.selection;
	if (!view) return false;

	// Find the parent card node
	const cardNode = $from.node(-1);
	const cardStart = $from.start(-1);
	const cardEnd = cardStart + cardNode.nodeSize;

	return cardEnd - 2;
}
