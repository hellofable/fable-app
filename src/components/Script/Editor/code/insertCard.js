export function insertCard() {
	const json = {
		type: 'card',
		content: [{ type: 'line', text: '' }]
	};

	const nodeToInsert = editor.schema.nodeFromJSON(json);

	// Working with ProseMirror transactions directly
	const transaction = editor.state.tr.insert(0, nodeToInsert);

	// The key is to use the correct metadata key
	transaction.setMeta('addToHistory', false);
	// Or alternatively in TipTap's case:
	transaction.setMeta('preventHistory', true);

	editor.view.dispatch(transaction);
}

window.insertCard = insertCard;