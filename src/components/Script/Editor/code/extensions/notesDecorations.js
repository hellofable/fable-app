import { Mark, mergeAttributes } from '@tiptap/core';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';

export const notesDecorations = Extension.create({
	name: 'notesDecorations',

	addProseMirrorPlugins() {
		return [
			new Plugin({
				props: {
					decorations(state) {
						const { doc } = state;
						const decorations = [];

						doc.descendants((node, pos) => {
							if (!node.isText) return;

							const regex = /\[\[([^\]]+)\]\]/g;
							let match;

							while ((match = regex.exec(node.text)) !== null) {
								const start = pos + match.index;
								const end = start + match[0].length;
								const innerStart = start + 2;
								const innerEnd = end - 2;

								decorations.push(
									Decoration.inline(start, start + 2, {
										class: 'bracket'
									})
								);
								decorations.push(
									Decoration.inline(innerStart, innerEnd, {
										class: 'fable-note'
									})
								);
								decorations.push(
									Decoration.inline(innerEnd, end, {
										class: 'bracket'
									})
								);
							}
						});

						return DecorationSet.create(doc, decorations);
					}
				}
			})
		];
	}
});
