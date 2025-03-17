import { buildLineArray } from './buildLineArray';
import { get } from 'svelte/store';
import { _editor, logTimer } from '$lib';
import { findChildren } from '@tiptap/core';

import { getCardNodeAtPos } from './getCardNodeAtPos';

// Format all <card> nodes in the document
export async function formatAllCardNodes() {
	const start = performance.now();
	const { state } = get(_editor);
	if (!state) return;

	let tr = state.tr; // Single transaction for all changes
	const cardNodes = findChildren(state.doc, (node) => node.type.name === 'card');

	cardNodes.forEach((cardNode) => {
		formatCardAtPos(cardNode.pos + 1);
	});
}

window.formatAllCardNodes = formatAllCardNodes;

// Format a single <card> node at a specific position
export function formatCardAtPos(pos) {
	const editor = get(_editor);
	let { state } = editor;
	const cardNode = getCardNodeAtPos(pos);

	if (!cardNode || cardNode.node.type.name !== 'card') {
		console.log('No card node found at position:', pos);
		return;
	}

	const lineArr = buildLineArray(cardNode.node);

	let tr = state.tr; // Single transaction for all changes

	let index = 0;
	cardNode.node.forEach((lineNode, lineOffset) => {
		const lineType = lineArr[index]?.lineType || 'action';
		const linePos = cardNode.pos + lineOffset + 1;
		const currentAttrs = state.doc.nodeAt(linePos).attrs;

		tr = tr.setNodeMarkup(linePos, state.schema.nodes.line, {
			...currentAttrs,
			type: lineType
		});

		index++;
	});

	tr.setMeta('addToHistory', false); // Prevent adding to the undo history
	editor.view.dispatch(tr); // Dispatch transaction for this single card
}

window.formatAllCardNodes = formatAllCardNodes;
