import { editorHelpers } from './helpers';
import { _cards, logTimer, establishCardsHierarchy, debounce } from '$lib';

export const createCards = debounce(createCardsDebounced, 500);
export const createCardsImmediate = createCardsDebounced;
async function createCardsDebounced() {
	// return
	// console.log('create cards');

	// Starts a timer for performance tracking; ensure logTimer is properly defined.
	// logTimer.start('createCards', true);

	// Retrieves all card nodes from the editor; consider handling cases where nodes might be empty.
	const nodes = editorHelpers.getAllCardNodes();

	// Index to track the position of each card.
	let index = 0;

	// Stores processed cards.
	const cards = [];

	// Tracks the cumulative page count across all cards.
	let runningPageCount = 0;

	// Processes a subset of nodes asynchronously to optimize performance.
	let sectionStack = []; // Stores active sections across chunks
	let sectionCardCounters = {}; // Keeps track of card count in each section
	let orphanCardCounter = 1; // Counter for cards not inside a section


	function cleanText(inputText) {
		// Remove leading hash symbols using a regular expression
		let cleanedText = inputText.replace(/^#+/, "");

		// Replace [[ or ]] with an empty string
		cleanedText = cleanedText.replace(/\[\[|\]\]/g, "");

		return cleanedText;
	}


	const processChunk = async (start, end) => {
		for (let i = start; i < end; i++) {
			const node = nodes[i];
			index++;

			const currentCard = _cards.getCardById(node.node.attrs.id) || {};
			const textContent = node.node.textContent;
			const isSection = textContent.startsWith('#');
			const lines = createLinesFromNode(node.node);
			const pageCount = calculatePage(lines);
			const firstLine = {
				textContent: lines[0].textContent,
				textContentNoMarkup: cleanText(lines[0].textContent)
			}

			let prevRunningCount = runningPageCount;
			runningPageCount += pageCount;

			let runningCountInt = Math.floor(runningPageCount);
			let prevRunningCountInt = Math.floor(prevRunningCount);

			let display = runningCountInt !== prevRunningCountInt ? runningCountInt : null;

			let pages = {
				count: pageCount,
				runningCount: runningPageCount,
				prevRunningCount: prevRunningCount,
				display
			};

			let sectionDepth = (textContent.match(/^#+/) || [''])[0].length;

			// **If it's a section, update the section stack**
			if (isSection) {
				// Remove sections from stack that are deeper or equal to the current
				while (
					sectionStack.length > 0 &&
					sectionStack[sectionStack.length - 1].depth >= sectionDepth
				) {
					sectionStack.pop();
				}

				// Add the new section to the stack
				sectionStack.push({
					id: node.node.attrs.id,
					depth: sectionDepth,
					index: 0 // Reset index for new section
				});

				// Reset section-specific card counter
				sectionCardCounters[node.node.attrs.id] = 0;
			}

			// **Determine parent section and card index**
			let parentSectionId =
				sectionStack.length > 0 ? sectionStack[sectionStack.length - 1].id : null;

			let indexInSection;
			if (parentSectionId) {
				indexInSection = ++sectionCardCounters[parentSectionId]; // Increment section count
			} else {
				indexInSection = ++orphanCardCounter; // Increment orphan counter if no section
			}

			const cardToAdd = {
				id: node.node.attrs.id,
				lines,
				index,
				pages,
				textContent,
				firstLine,
				selected: false,
				depth: isSection
					? sectionDepth
					: parentSectionId
						? sectionStack[sectionStack.length - 1].depth
						: null,
				section: {
					isSection,
					sectionDepth,
					sectionCollapsed: (isSection && currentCard?.section?.sectionCollapsed) || false
				},
				dependencyInfo: {
					parentId: parentSectionId,
					parentIds: sectionStack.map((s) => s.id), // Store full hierarchy
					parentCardDepth: parentSectionId ? sectionStack[sectionStack.length - 1].depth : null,
					hasCollapsedParent: false,
					numberOfChildren: 0
				},
				indexInSection: indexInSection - 1 || 0 // **Stores the card’s position in its respective section or as an orphan**
			};

			cards.push(cardToAdd);
		}
	};

	// Defines batch size for processing nodes to optimize performance.
	const chunkSize = 30; // Adjust based on performance needs.

	// Processes nodes in chunks to prevent blocking the event loop.
	for (let i = 0; i < nodes.length; i += chunkSize) {
		// console.log("Processing chunk", i, "to", Math.min(i + chunkSize, nodes.length)); // Debugging log.
		await processChunk(i, Math.min(i + chunkSize, nodes.length));
		await new Promise((resolve) => setTimeout(resolve, 0)); // Prevents blocking the event loop.
	}

	// Updates the global card store with the newly processed cards.
	_cards.set(cards);

	// Establishes parent-child relationships between cards.
	establishCardsHierarchy();

	return;
}

// creates a structured representation of the lines of text in a card node
function createLinesFromNode(node) {
	// Initialize an empty array to hold lines of text
	let lines = [];

	// Iterate over each element in the node's content
	node.content.content.forEach((element) => {
		// Extract the text content of the element and add it to the lines array
		lines.push(element.textContent);
	});

	// Process the lines array using the processScreenplayLines function
	const out = processScreenplayLines(lines);

	// Return the processed output
	return out;
}


function calculatePage(linesArray) {

	let totalLines = 0;

	let prevLine = null;
	linesArray.forEach((line) => {



		let lineCount = 0;

		if (containsOnlyNoteTags(line.textContent)) {
			return 0
		}


		if (line.type === 'action') {
			const content = line.textContent.trim();
			lineCount = content.length > 0 ? Math.ceil(content.length / 55) : 1;
			totalLines += lineCount;
		}

		if (line.type === 'dia') {
			const content = line.textContent.trim();
			lineCount = Math.ceil(content.length / 36);
			totalLines += lineCount;
		}

		if (['char', 'pars', 'scene'].includes(line.type)) {
			lineCount = 1;
			totalLines += lineCount;
		}

		prevLine = line
	});

	const pageCount = totalLines / 55;


	return parseFloat(pageCount.toFixed(2));
}

function containsOnlyNoteTags(str) {
	const noteTagPattern = /^\s*(\[\[[^\[\]]+\]\]\s*)+$/;
	return noteTagPattern.test(str);
}


export function processScreenplayLines(lines) {
	let prevLineText = null;
	let prevLineType = null;
	let prevLineExists = false;

	return lines.map((lineText, index) => {
		const trimmedText = lineText.trim();
		const nextLineText = index + 1 < lines.length ? lines[index + 1].trim() : null;

		const lineType = determineLineType({
			lineText: trimmedText,
			prevLineType,
			prevLineText,
			prevLineExists,
			nextLineText
		});

		// Update previous line tracking
		prevLineText = trimmedText;
		prevLineType = lineType;
		prevLineExists = index > 0;

		return {
			textContent: trimmedText,
			type: lineType || 'action'
		};
	});
}

export function determineLineType({
	lineText,
	prevLineType,
	prevLineText,
	prevLineExists,
	nextLineText
}) {
	let lineType = null;
	const match = matchLineType(lineText);
	const firstLineOrPrevEmpty = !prevLineExists || !prevLineText;

	// Rule: Decorate "pars" lines after character or dialogue
	if ((prevLineType === 'char' || prevLineType === 'dia') && match === 'pars') {
		lineType = 'pars';
		return lineType;
	}

	// Rule: Dialogue lines after character lines
	if (
		(prevLineType === 'char' || prevLineType === 'dia' || prevLineType === 'pars') &&
		lineText &&
		prevLineExists
	) {
		lineType = 'dia';
		return lineType;
	}

	// Rule: Character lines (uppercase, not empty, longer than 1 char, followed by text)
	if (
		!match &&
		!prevLineType &&
		(!prevLineText || prevLineExists === false) &&
		isUpperCase(lineText) &&
		lineText.length > 1 &&
		nextLineText
	) {
		lineType = 'char';
		return lineType;
	}

	// Rule: Scene, section, trans, center, synopsis lines
	const arr = ['scene', 'section', 'trans', 'center', 'synopsis', 'char'];
	if (arr.includes(match) && firstLineOrPrevEmpty) {
		// if (arr.includes(match)) {
		lineType = match;
		return lineType;
	}

	// If no match, return null
	return lineType;
}

function matchLineType(lineText) {
	if (!lineText) return null;
	if (lineText.match(/^\>.*\<$/)) return 'center';
	if (lineText.match(/^@/)) return 'char';
	if (lineText.match(/^(INT|EXT|TO:|\.(?!\.))/)) return 'scene';
	if (lineText.match(/^>|TO:$/)) return 'trans';
	if (lineText.match(/^\=/)) return 'synopsis';
	if (lineText.match(/^\(.*\)$/)) return 'pars';
	if (lineText.match(/^\#/)) return 'section';

	return null;
}

function isUpperCase(str) {
	return str === str.toUpperCase();
}
