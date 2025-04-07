import { _editor, debounce } from '$lib';
import { getCardNodeAtPos } from "./formatCard/getCardNodeAtPos";

export function convertTextToHtmlCardsOnly(scriptText, fromTemplate = false) {
	const cards = splitTextIntoCards(scriptText);
	const html = convertCardsToHtml(cards, fromTemplate);
	return html;
}

function convertCardsToHtml(cards, fromTemplate) {

	let html = '';
	html = '<cardgrid>';

	cards.forEach((card) => {
		html += `<div class="card">`;

		// Split the card content by newlines
		let lines = card.trim().split('\n');

		lines.forEach((line) => {
			if (fromTemplate) {

				line = line.replace(/^\./, ''); // Remove leading period if fromTemplate is true
			}
			html += `<action>${line}</action>`;
		});

		html += `</div>`;
	});
	html += '</cardgrid>';
	return html;
}


export function splitTextIntoCards(scriptText) {
	// console.log("no markers");

	let scriptArr = scriptText.split(/\r?\n/);
	// itterate over lines
	// creating and pushing cards as needed
	let cards = [];
	let card = '';
	scriptArr.forEach(function (lineText, index) {
		// on match (new card)
		// push existing card text and start new one

		if (lineText.match(/^INT|^\#|^EXT|^\./i) && !lineText.match(/^\.\./i)) {
			cards.push(card);
			card = '';
		}
		card += lineText + '\n';
	});
	cards.push(card);
	// we now have an array of cards containting text for each
	// lets create another array, this time with a json object
	// that containts the text AND encrypted text
	const cardsOut = [];
	cards.forEach(function (cardText, index) {
		cardText = cardText.trim();

		if (!cardText) return;
		const card = {
			text: cardText
		};
		cardsOut.push(card);
	});
	if (cards[0] == '') cards.shift();

	return cards;
}

// createNested

export const createNested = debounce(debounceCreateNested, 1000);
export const createNestedImmediate = debounceCreateNested;

function debounceCreateNested() {
	// Get the current editor instance
	const editor = _editor.get();

	// Get the current selection start position within the editor's state
	const selection = editor.state.selection.from;

	// Generate and organize the cards into the desired structure
	const cards = createCardsArr();
	const out = organizeCards(cards);

	// Retrieve the current HTML content from the editor before making any changes
	const beforeHtml = editor.getHTML();

	// Get the newly organized HTML after processing the cards
	const afterHtml = out.html;

	// Compare the current and new HTML to check if any changes are needed
	const documentsMatch = compareCardGrids(beforeHtml, afterHtml);

	// If there's no difference, exit the function as no updates are required
	if (documentsMatch) return;

	// Destructure the 'from' and 'to' positions of the current selection within the editor's state
	const { from, to } = editor.state.selection;

	// Retrieve the card node at the current selection position
	const cardNode = getCardNodeAtPos(selection);
	const nodeOffsetPos = (from - cardNode.pos);
	const cardId = cardNode.node.attrs.id;



	// Update the editor's content with the new organized HTML without merging it with the undo stack
	editor.commands.setContent(afterHtml, false);


	const oldCard = getNodeById(cardId);

	if (!oldCard) {
		editor.commands.setTextSelection({ from, to: from });
		return
	}


	const newPos = oldCard.pos + nodeOffsetPos;
	editor.commands.setTextSelection({ from: newPos, to: newPos });


	// Reposition the text cursor to its original position (approximately) in the updated content
	// editor.commands.setTextSelection({ from, to: from });
}


function createCardsArr() {
	const editor = _editor.get();
	const html = editor.getHTML();
	const doc = new DOMParser().parseFromString(html, 'text/html');
	const cards = doc.querySelectorAll('card');
	return cards;
}

function organizeCards(cards) {
	let result = [];
	let htmlOutput = '';
	let stack = [];
	let levelStack = []; // Track levels separately
	let currentGrid = null;

	cards.forEach((card) => {
		let firstLine = card.textContent.trim().split('\n')[0];
		let match = firstLine.match(/^(#+)/);
		let level = match ? match[1].length : 0;

		if (level > 0) {
			let newGrid = document.createElement('cardgrid');

			// Pop from stack only if the current level is not directly nested
			while (stack.length > 0 && levelStack[levelStack.length - 1] >= level) {
				stack.pop();
				levelStack.pop();
			}

			if (stack.length > 0) {
				stack[stack.length - 1].appendChild(newGrid);
			} else {
				result.push(newGrid);
			}

			stack.push(newGrid);
			levelStack.push(level);
			currentGrid = newGrid;
		} else {
			if (!currentGrid) {
				currentGrid = document.createElement('cardgrid');
				result.push(currentGrid);
			}
		}

		currentGrid.appendChild(card);
	});

	result.forEach((grid) => {
		if (grid.children.length > 0) {
			htmlOutput += grid.outerHTML + '\n';
		}
	});

	return { domArray: result.filter((grid) => grid.children.length > 0), html: htmlOutput };
}

function compareCardGrids(html1, html2) {
	const parseHTML = (html) => new DOMParser().parseFromString(html, 'text/html');

	const getGridStructure = (doc) => {
		return Array.from(doc.querySelectorAll('cardgrid')).map(
			(grid) => Array.from(grid.children).map((el) => el.tagName.toLowerCase()) // Capture only element structure
		);
	};

	const doc1 = parseHTML(html1);
	const doc2 = parseHTML(html2);

	return JSON.stringify(getGridStructure(doc1)) === JSON.stringify(getGridStructure(doc2));
}


function getNodeById(id) {
	const editor = _editor.get();
	let foundNode = null;

	editor.state.doc.descendants((node, pos, parent) => {
		// Check if the node has the desired ID
		if (node.attrs && node.attrs.id === id) {
			foundNode = { node, pos, parent };
			// Returning false stops the traversal once we found the node
			return false;
		}
		// Continue traversal
		return true;
	});

	return foundNode;
}

window.getNodeById = getNodeById;














// function replaceEditorContent(newHtml) {
// 	const editor = _editor.get();
// 	const view = editor.view;

// 	const dom = new DOMParser().parseFromString(newHtml, 'text/html');

// 	// Use the slice method to properly handle document structure
// 	const slice = ProseMirrorDOMParser.fromSchema(view.state.schema).parseSlice(dom.body);

// 	// First transaction: clear the document
// 	const tr1 = view.state.tr;
// 	tr1.delete(0, view.state.doc.content.size);
// 	view.dispatch(tr1);

// 	// Second transaction: insert the new content at position 0
// 	// We need to get the updated state after the first transaction
// 	const tr2 = view.state.tr;
// 	tr2.insert(0, slice.content);
// 	view.dispatch(tr2);
// }
