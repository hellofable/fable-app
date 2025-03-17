import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { createCards } from '../createCards';
import { createNested } from '../parseScript';

let lastKeyPress = null; // Stores the last pressed key

export const changeTracker = Extension.create({
	name: 'changeTracker',

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: new PluginKey('changeTrackerPlugin'),

				view(editorView) {
					editorView.dom.addEventListener('keydown', (event) => {
						lastKeyPress = event.key;
						createCards();
						createNested();
					});

					return {
						destroy() {
							editorView.dom.removeEventListener('keydown', () => {});
						}
					};
				}
			})
		];
	}
});
