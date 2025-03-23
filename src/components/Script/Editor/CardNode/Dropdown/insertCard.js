import { createNestedImmediate, createCardsImmediate } from "$lib"

export function insertCard(aboveOrBelow, getPos, node) {
	let pos;

	if (aboveOrBelow === 'above') {
		pos = getPos();
	}

	if (aboveOrBelow === 'below') {
		pos = getPos() + node.nodeSize;
	}

	const json = {
		type: 'card',
		content: [{ type: 'line', text: 'some text' }]
	};

	// Parse the JSON into a ProseMirror node
	const nodeToInsert = editor.schema.nodeFromJSON(json);

	// Position before the target node
	const nodePos = pos;

	// Insert the parsed node
	editor.view.dispatch(editor.view.state.tr.insert(nodePos, nodeToInsert));


	console.log("create nested");

	createCardsImmediate()
	createNestedImmediate();

}


// window.cc = createCards;
// window.cn = createNested;