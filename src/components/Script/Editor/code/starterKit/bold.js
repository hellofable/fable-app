import { Mark, mergeAttributes, markInputRule, markPasteRule } from '@tiptap/core';

/**
 * Matches bold text via `**` as input.
 */
const starInputRegex = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/;
/**
 * Matches bold text via `**` while pasting.
 */
const starPasteRegex = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g;
/**
 * Matches bold text via `__` as input.
 */

const Bold = Mark.create({
	name: 'bold',
	inclusive: true,
	spanning: false,
	addOptions() {
		return {
			HTMLAttributes: {}
		};
	},
	parseHTML() {
		return [
			{
				tag: 'strong'
			},
			{
				tag: 'b',
				getAttrs: (node) => node.style.fontWeight !== 'normal' && null
			},
			{
				style: 'font-weight',
				getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
			}
		];
	},
	renderHTML({ HTMLAttributes }) {
		return ['strong', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
	},
	addCommands() {
		return {
			setBold:
				() =>
				({ commands }) => {
					return commands.setMark(this.name);
				},
			toggleBold:
				() =>
				({ commands }) => {
					return commands.toggleMark(this.name);
				},
			unsetBold:
				() =>
				({ commands }) => {
					return commands.unsetMark(this.name);
				}
		};
	},
	addKeyboardShortcuts() {
		return {
			'Mod-b': () => this.editor.commands.toggleBold(),
			'Mod-B': () => this.editor.commands.toggleBold()
		};
	},
	addInputRules() {
		return [
			markInputRule({
				find: starInputRegex,
				type: this.type
			})
		];
	},
	addPasteRules() {
		return [
			markPasteRule({
				find: starPasteRegex,
				type: this.type
			})
		];
	}
});

export { Bold, Bold as default, starInputRegex, starPasteRegex };
