import { Extension } from '@tiptap/core';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin } from 'prosemirror-state';

export const decorateScreenplay = Extension.create({
	name: 'decorateScreenplay',

	addProseMirrorPlugins() {
		function createDecorations(doc) {
			const decorations = [];
			let prevLineText = null;
			let prevLineType = null;
			let prevLineExists = false;

			doc.descendants((node, pos, parent, index) => {
				if (node.type.name !== 'line') return;

				const isFirstLineInCard = index === 0 && parent.type.name === 'card';
				prevLineExists = !isFirstLineInCard; // False for first line in a card, true otherwise

				const lineText = node.textContent.trim();
				const nextLineText =
					index + 1 < parent.childCount ? parent.child(index + 1).textContent.trim() : null;

				const lineType = determineLineType({
					lineText,
					prevLineType,
					prevLineText,
					prevLineExists,
					nextLineText
				});

				if (lineType) {
					decorations.push(Decoration.node(pos, pos + node.nodeSize, { class: lineType }));
				}

				// Update previous line tracking
				prevLineText = lineText;
				prevLineType = lineType;
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

export function determineLineType({
	lineText,
	prevLineType,
	prevLineText,
	prevLineExists,
	nextLineText
}) {
	let lineType = null;
	const match = matchLineType(lineText);
	const firstLineOrPrevEmpty = !prevLineExists || !prevLineText;

	// Rule: Decorate "pars" lines after character or dialogue
	if ((prevLineType === 'char' || prevLineType === 'dia') && match === 'pars') {
		lineType = 'pars';
		return lineType;
	}

	// Rule: Dialogue lines after character lines
	if (
		(prevLineType === 'char' || prevLineType === 'dia' || prevLineType === 'pars') &&
		lineText &&
		prevLineExists
	) {
		lineType = 'dia';
		return lineType;
	}

	// Rule: Character lines (uppercase, not empty, longer than 1 char, followed by text)
	if (
		!match &&
		!prevLineType &&
		(!prevLineText || prevLineExists === false) &&
		isUpperCase(lineText) &&
		lineText.length > 1 &&
		nextLineText
	) {
		lineType = 'char';
		return lineType;
	}

	// Rule: Scene, section, trans, center, synopsis lines
	const arr = ['scene', 'section', 'trans', 'center', 'synopsis', 'char'];
	if (arr.includes(match) && firstLineOrPrevEmpty) {
		// if (arr.includes(match)) {
		lineType = match;
		return lineType;
	}

	// If no match, return null
	return lineType;
}

function matchLineType(lineText) {
	if (!lineText) return null;
	if (lineText.match(/^\>.*\<$/)) return 'center';
	if (lineText.match(/^@/)) return 'char';
	if (lineText.match(/^(INT|EXT|TO:|\.(?!\.))/)) return 'scene';
	if (lineText.match(/^>|TO:$/)) return 'trans';
	if (lineText.match(/^\=/)) return 'synopsis';
	if (lineText.match(/^\(.*\)$/)) return 'pars';
	if (lineText.match(/^\#/)) return 'section';

	return null;
}

function isUpperCase(str) {
	return str === str.toUpperCase();
}
