import { _editor, debounce } from '$lib';


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
	const editor = _editor.get();

	const selection = editor.state.selection.from;

	// get ogranzied JSON
	const cards = createCardsArr();
	const out = organizeCards(cards);

	const beforeHtml = editor.getHTML();
	const afterHtml = out.html;

	const documentsMatch = compareCardGrids(beforeHtml, afterHtml);

	if (documentsMatch) {
		console.log('Documents match');
		return;
	}

	// console.log('create nested');

	const { from, to } = editor.state.selection;
	editor.commands.setContent(afterHtml, false);
	editor.commands.setTextSelection({ from, to });
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
