import { Plugin } from 'prosemirror-state';
import { Extension } from '@tiptap/core';

export const onKeyPress = Extension.create({
	name: 'onKeyPress',

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					handleKeyDown(view, event) {
						const keyPattern = /^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]$/;

						if (
							keyPattern.test(event.key) ||
							['Enter', 'Backspace', 'Delete'].includes(event.key)
						) {
						}

						return false; // Allow ProseMirror to handle the key normally
					},
					handleDOMEvents: {
						paste(view, event) {
							return false; // Allow ProseMirror to handle paste
						},
						cut(view, event) {
							return false; // Allow ProseMirror to handle cut
						}
					}
				}
			})
		];
	}
});
