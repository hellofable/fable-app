import { _editor } from '$lib';

import StarterKit from './starterKit/starterKit';
import { schema } from './schema';
import { generateJSON } from '@tiptap/core';
import { DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';

export function convertTextToHtmlCardsOnly(scriptText) {
	const cards = splitTextIntoCards(scriptText);
	const html = convertCardsToHtml(cards);
	return html;
	return;
}

function convertCardsToHtml(cards) {
	let html = '';
	html = '<cardgrid>';

	cards.forEach((card) => {
		html += `<div class="card">`;

		// Split the card content by newlines
		const lines = card.trim().split('\n');

		lines.forEach((line) => {
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

export function createNested() {
	const editor = _editor.get();

	const selection = editor.state.selection.from;

	// get ogranzied JSON
	const cards = createCardsArr();
	const out = organizeCards(cards);

	const beforeHtml = editor.getHTML();
	const afterHtml = out.html;

	const oldDom = parseHTML(beforeHtml);
	const newDom = parseHTML(afterHtml);

	const oldCardGrids = Array.from(oldDom.querySelectorAll('cardgrid')).filter(
		(grid) => !grid.closest('cardgrid cardgrid')
	);
	const newCardGrids = Array.from(newDom.querySelectorAll('cardgrid')).filter(
		(grid) => !grid.closest('cardgrid cardgrid')
	);

	newCardGrids.forEach((newGrid, index) => {
		if (oldCardGrids[index]) {
			const oldGrid = oldCardGrids[index];

			if (oldGrid.outerHTML !== newGrid.outerHTML) {
				console.log(`Replacing grid at index ${index}`);

				replaceGrid(index, newGrid);
			} else {
				console.log(`Grid at index ${index} is the same`);
			}
		} else {
			console.log(`Adding grid at index ${index}`);
			addGrid(index, newGrid);
		}
	});

	if (oldCardGrids.length > newCardGrids.length) {
		const toRemove = oldCardGrids.length - newCardGrids.length;
		if (toRemove) removeCardGridsFromEnd(toRemove);
	}
	editor.commands.setTextSelection(selection);
}

function replaceGrid(oldGridIndex, newGrid) {
	let editor = _editor.get();
	let grids = [];

	editor.state.doc.forEach((node, pos) => {
		if (node.type.name === 'cardgrid') grids.push({ node, pos });
	});

	let targetGrid = grids[oldGridIndex]; // 0-based indexing
	if (targetGrid) {
		let dom = new DOMParser().parseFromString(newGrid.outerHTML, 'text/html').body.firstChild;
		let newNode = ProseMirrorDOMParser.fromSchema(editor.schema).parse(dom);

		let { pos, node } = targetGrid;
		// let tr = editor.state.tr.replaceWith(pos, pos + node.nodeSize, newNode.content);
		let tr = editor.state.tr.replaceWith(pos, pos + node.nodeSize, newNode);

		editor.view.dispatch(tr);

		console.log(`Replaced <cardgrid> at index ${oldGridIndex}`);
	} else {
		console.log(`No <cardgrid> found at index ${oldGridIndex}`);
	}
}

function addGrid(newIndex, newGrid) {
	let editor = _editor.get();
	let dom = new DOMParser().parseFromString(newGrid.outerHTML, 'text/html').body.firstChild;
	let newNode = ProseMirrorDOMParser.fromSchema(editor.schema).parse(dom);

	let endPos = editor.state.doc.content.size;
	let tr = editor.state.tr.insert(endPos, newNode.content);
	editor.view.dispatch(tr);

	console.log(`Added <cardgrid> at index ${newIndex}`);
}

window.createNested = createNested;

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

function parseHTML(htmlString) {
	const parser = new DOMParser();
	return parser.parseFromString(htmlString, 'text/html');
}

function getCardGridByIndex(index) {
	console.log(index);

	const editor = _editor.get();
	let grids = [];

	editor.state.doc.forEach((node, pos) => {
		if (node.type.name === 'cardgrid') {
			grids.push({ node, pos });
		}
	});

	let targetGrid = grids[index - 1]; // Index is 1-based
	if (targetGrid) {
		return { index, grid: targetGrid.node };
	} else {
		console.log(`No <cardgrid> found at index ${index}`);
	}
}

window.getCardGridByIndex = getCardGridByIndex;

function removeCardGridsFromEnd(count) {
	let editor = _editor.get();
	let grids = [];

	// Collect all cardgrid nodes and their positions
	editor.state.doc.forEach((node, pos) => {
		if (node.type.name === 'cardgrid') {
			grids.push({ node, pos });
		}
	});

	let totalGrids = grids.length;
	if (totalGrids === 0) {
		console.log('No <cardgrid> elements to remove.');
		return;
	}

	// Ensure we do not remove more than what exists
	count = Math.min(count, totalGrids);
	let tr = editor.state.tr;

	// Remove the specified number of cardgrids from the end
	for (let i = totalGrids - 1; i >= totalGrids - count; i--) {
		let { pos, node } = grids[i];
		tr.delete(pos, pos + node.nodeSize);
	}

	editor.view.dispatch(tr);
	console.log(`Removed ${count} <cardgrid> elements from the end.`);
}

window.removeCardGridsFromEnd = removeCardGridsFromEnd;
