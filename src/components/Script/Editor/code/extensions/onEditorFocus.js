import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Decoration, DecorationSet } from '@tiptap/pm/view';
import { debounce, _cards } from '$lib';
import { getCardNodeAtPos } from '../formatCard';

export const onEditorFocus = Extension.create({
	name: 'onEditorFocus',

	addOptions() {
		return {
			className: 'has-focus',
			mode: 'all'
		};
	},

	addProseMirrorPlugins() {
		return [
			new Plugin({
				key: new PluginKey('focus'),

				props: {
					decorations: ({ doc, selection }) => {
						const { isEditable, isFocused } = this.editor;
						const { anchor } = selection;
						const decorations = [];

						if (!isEditable || !isFocused) {
							return DecorationSet.create(doc, []);
						}

						// Maximum Levels
						let maxLevels = 0;
						if (this.options.mode === 'deepest') {
							doc.descendants((node, pos) => {
								if (node.isText) {
									return;
								}

								const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;
								if (!isCurrent) {
									return false;
								}

								maxLevels += 1;
							});
						}

						// Loop through current
						let currentLevel = 0;
						doc.descendants((node, pos) => {
							if (node.isText) {
								return false;
							}

							const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;
							if (!isCurrent) {
								return false;
							}

							currentLevel += 1;
							const outOfScope =
								(this.options.mode === 'deepest' && maxLevels - currentLevel > 0) ||
								(this.options.mode === 'shallowest' && currentLevel > 1);

							if (outOfScope) {
								return this.options.mode === 'deepest';
							}

							decorations.push(
								Decoration.node(pos, pos + node.nodeSize, {
									class: this.options.className
								})
							);
							debouncedUnCollapseSection(pos);
						});

						return DecorationSet.create(doc, decorations);
					}
				}
			})
		];
	}
});

const debouncedUnCollapseSection = debounce(unCollapseSection, 50); // 300ms delay

function unCollapseSection(pos) {
	const node = getCardNodeAtPos(pos).node;

	// Retrieve the card associated with the node's ID
	let card = _cards.getCardById(node.attrs.id);

	// Exit if the card does not exist or the section is already uncollapsed
	if (!card || card.section.sectionCollapsed === false) return;

	// Set the section's collapsed state to false
	card.section.sectionCollapsed = false;

	// Update the card in the card collection
	_cards.updateCard(node.attrs.id, card);

	// Refresh the card display
}
