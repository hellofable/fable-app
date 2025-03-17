import { Extension } from '@tiptap/core';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';

export const addModifierClass = Extension.create({
    name: 'addModifierClass',

    addProseMirrorPlugins() {
        function createDecorations(doc) {
            const decorations = [];
            doc.descendants((node, pos) => {
                if (node.isText) {
                    const text = node.text;

                    // Check for the first pattern: one or more '#' or '=' or '@' or '.' at the start of the line
                    const startLineMatch = text.match(/^[#@\.]+|=+/);
                    if (startLineMatch) {
                        const length = startLineMatch[0].length;
                        decorations.push(
                            Decoration.inline(pos, pos + length, { class: 'modifier' })
                        );
                    }

                    // Check for the second pattern: [[any text here]] anywhere in the line
                    const doubleBracketMatches = [...text.matchAll(/\[\[([^\]]+)\]\]/g)];
                    for (const match of doubleBracketMatches) {
                        const start = pos + match.index; // Starting position of [[...]]
                        const end = start + match[0].length; // Ending position of [[...]]

                        // Add decoration for the entire [[...]] with 'bracket' class
                        decorations.push(
                            Decoration.inline(start, end, { class: 'bracket' })
                        );

                        // Add 'modifier' class decoration to just the opening '[['
                        decorations.push(
                            Decoration.inline(start, start + 2, { class: 'modifier-note' })
                        );

                        // Add 'modifier' class decoration to just the closing ']]'
                        decorations.push(
                            Decoration.inline(end - 2, end, { class: 'modifier-note' })
                        );
                    }
                }



            });
            return DecorationSet.create(doc, decorations);
        }

        return [
            new Plugin({
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
