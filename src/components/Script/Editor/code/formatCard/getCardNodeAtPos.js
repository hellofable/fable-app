import { _editor } from '$lib';
import { get } from 'svelte/store';

export function getCardNodeAtPosOLD(pos) {
	const editor = get(_editor);
	if (!editor) return null;

	let cardNode = null;

	editor.state.doc.descendants((node, nodePos) => {
		if (node.type.name.includes('card') && nodePos <= pos && pos < nodePos + node.nodeSize) {
			cardNode = { node, pos: nodePos };
			return false; // Stop traversal once the card node is found
		}
	});

	return cardNode;
}

export function getCardNodeAtPos(position) {
	const editor = _editor.get();

	if (!editor) return null;

	const state = editor.state;
	const $pos = state.doc.resolve(position);

	for (let depth = $pos.depth; depth >= 0; depth--) {
		let node = $pos.node(depth);
		if (node.type.name === 'card') {
			return { node, pos: $pos.before(depth) };
		}
	}

	return null;
}
