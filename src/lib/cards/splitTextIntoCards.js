export function splitTextIntoCards(scriptText) {
	const hasCardMarkers = scriptText.match(/\[\[\-\-\-\]\]/g);
	if (!hasCardMarkers) return splitTextIntoCardsNoMarkers(scriptText);

	let cards = scriptText.split('[[---]]');

	const cardsOut = [];
	cards.forEach(function (cardText, index) {
		if (!cardText) return;
		const card = {
			text: cardText
		};
		cardsOut.push(card);
	});

	// cards.pop()
	if (cards[0] == '') cards.shift();

	const x = parseCardsToCardGrid(cards);
	console.log(x);

	return cards;
}

export function splitTextIntoCardsNoMarkers(scriptText) {
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

export function makeHtml(cards) {
	let html = '';

	cards.forEach((card) => {
		html += `<div class="card">`;

		// Split the card content by newlines
		const lines = card.trim().split('\n');

		lines.forEach((line) => {
			html += `<p>${line}</p>`;
		});

		html += `</div>`;
	});

	return html;
}

// -------------------------

export function parseCardsToCardGrid(cards) {
	let root = { type: 'cardgrid', children: [] };
	let currentParent = root;
	let sectionStack = [root];

	cards.forEach((cardText) => {
		cardText = cardText.trim();
		if (!cardText) return;

		// Check if it's a section (starts with #)
		let match = cardText.match(/^(#+)/);
		if (match) {
			let level = match[1].length;
			let newGrid = { type: 'cardgrid', children: [{ type: 'card', content: cardText }] };

			if (level === 1) {
				// **Ensure all top-level `#` sections are siblings**
				root.children.push(newGrid);
				currentParent = newGrid;
				sectionStack = [root, newGrid]; // **Reset stack for top-level sections**
			} else {
				// **Ensure proper nesting for `##`, `###`, etc.**
				while (sectionStack.length >= level) sectionStack.pop();
				sectionStack[sectionStack.length - 1].children.push(newGrid);
				sectionStack.push(newGrid);
				currentParent = newGrid;
			}
		}
		// Handle scene lines or normal text (not headers)
		else {
			currentParent.children.push({ type: 'card', content: cardText });
		}
	});

	return root;
}

export function renderCardGrid(node) {
	if (!node || !node.children) return '';

	let html = `<cardgrid>`;
	node.children.forEach((child) => {
		if (child.type === 'cardgrid') {
			html += renderCardGrid(child);
		} else if (child.type === 'card') {
			html += `<card>`;
			const lines = child.content
				.split('\n')
				.map((line) => line.trim())
				.filter((line) => line);
			lines.forEach((line) => {
				html += `<line>${line}</line>`;
			});
			html += `</card>`;
		}
	});
	html += `</cardgrid>`;

	return html;
}
