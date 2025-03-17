import { Plugin } from 'prosemirror-state';
import { Extension } from '@tiptap/core';
import { debounce } from '$lib';
import { formatCardAtPos } from '../formatCard/formatCardNode';
const doUpdatesDebounced = debounce(doUpdates, 100);

function doUpdates(pos) {
	formatCardAtPos(pos);
}

let isFormatting = false;

export const formatCard = Extension.create({
	name: 'formatCard',

	addProseMirrorPlugins() {
		return [
			new Plugin({
				view(editorView) {
					return {
						update: (view, prevState) => {
							if (isFormatting) return; // Exit if already formatting

							const { state } = view;
							const pos = state.selection.from;

							// Only proceed if the document has changed
							if (prevState.doc !== state.doc) {
								isFormatting = true; // Set flag to prevent loop

								// Use setTimeout to reset the flag after debounce delay
								doUpdatesDebounced(pos);
								setTimeout(() => {
									isFormatting = false;
								}, 1000); // Match debounce delay
							}
						}
					};
				}
			})
		];
	}
});
