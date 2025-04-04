import { Mark, mergeAttributes, markInputRule, markPasteRule } from '@tiptap/core';

/**
 * Matches an italic to a *italic* on input.
 */
const starInputRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/;
/**
 * Matches an italic to a *italic* on paste.
 */
const starPasteRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g;

/**
 * This extension allows you to create italic text.
 * @see https://www.tiptap.dev/api/marks/italic
 */
const Italic = Mark.create({
    name: 'italic',
    spanning: false,
    addOptions() {
        return {
            HTMLAttributes: {},
        };
    },
    parseHTML() {
        return [
            {
                tag: 'em',
            },
            {
                tag: 'i',
                getAttrs: node => node.style.fontStyle !== 'normal' && null,
            },
            {
                style: 'font-style=italic',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['em', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
    addCommands() {
        return {
            setItalic: () => ({ commands }) => {
                return commands.setMark(this.name);
            },
            toggleItalic: () => ({ commands }) => {
                return commands.toggleMark(this.name);
            },
            unsetItalic: () => ({ commands }) => {
                return commands.unsetMark(this.name);
            },
        };
    },
    addKeyboardShortcuts() {
        return {
            'Mod-i': () => this.editor.commands.toggleItalic(),
            'Mod-I': () => this.editor.commands.toggleItalic(),
        };
    },
    addInputRules() {
        return [
            markInputRule({
                find: starInputRegex,
                type: this.type,
            })
        ];
    },
    addPasteRules() {
        return [
            markPasteRule({
                find: starPasteRegex,
                type: this.type,
            })
        ];
    },
});

export { Italic, Italic as default, starInputRegex, starPasteRegex };
