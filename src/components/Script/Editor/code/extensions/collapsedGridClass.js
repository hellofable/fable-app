import { Extension } from '@tiptap/core';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';
import { _cards } from '$lib';

export const collapsedGridClass = Extension.create({
	name: 'collapsedGridClass',

	addProseMirrorPlugins() {
		function createDecorations(doc) {
			const decorations = [];

			doc.descendants((node, pos) => {
				if (node.type.name === 'cardgrid') {
					const cardCount = node.childCount;
					console.log(node.firstChild);

					decorations.push(Decoration.node(pos, pos + node.nodeSize, { class: 'collapsed' }));
				}
			});
			return DecorationSet.create(doc, decorations);
		}

		return [
			new Plugin({
				key: new PluginKey('collapsedGridClass'),

				state: {
					init(_, { doc }) {
						return createDecorations(doc);
					},
					apply(tr, oldDecorations) {
						if (!tr.docChanged) return oldDecorations;
						return createDecorations(tr.doc);
					}
				},
				props: {
					decorations(state) {
						return this.getState(state);
					}
				}
			})
		];
	}
});
