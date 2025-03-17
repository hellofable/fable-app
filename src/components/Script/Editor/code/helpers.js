
import { _cards, _editor } from '$lib';
import { findChildren } from '@tiptap/core';

export function getCardNodeAtPos(pos, editor) {
	if (!editor) editor = _editor.get();
	let cardNode = null;
	editor.state.doc.descendants((node, nodePos) => {
		if (node.type.name.includes('card') && nodePos <= pos && pos < nodePos + node.nodeSize) {
			cardNode = node;
			return false; // Stop traversal once the card node is found
		}
	});

	return cardNode;
}

export function getAllCardNodes(editor) {
	if (!editor) editor = _editor.get();
	const state = editor.state;
	const cardNodes = findChildren(state.doc, (node) => node.type.name === 'card');
	return cardNodes;
}

export function getEditorState() {
	return _editor.get();
}

export const editorHelpers = {
	getCardNodeAtPos,
	getAllCardNodes,
	getEditorState
};

window.eh = editorHelpers;
