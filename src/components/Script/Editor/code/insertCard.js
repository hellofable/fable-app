

export function insertCard() {
	const json = {
		type: 'card',
		content: [{ type: 'line', text: 'some text' }]
	};

	// Parse the JSON into a ProseMirror node
	const nodeToInsert = editor.schema.nodeFromJSON(json);

	// Insert the parsed node
	editor.view.dispatch(editor.view.state.tr.insert(0, nodeToInsert));
}

window.insertCard = insertCard;
