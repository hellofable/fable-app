export const markdownToHTML = (markdownString) => {
	const markdownRegex = [
		['_([^_]+)_', '<u>$1</u>'],
		['\\*\\*([^*]+)\\*\\*', '<strong>$1</strong>'],
		['\\*([^*]+)\\*', '<em>$1</em>'],
		['\\[\\[([^[]+)\\]\\]', '<note>[[$1]]</note>']
	];

	for (let regexStr of markdownRegex) {
		const regex = new RegExp(regexStr[0], 'g');
		markdownString = markdownString.replace(regex, regexStr[1]);
	}

	return markdownString;
};

export const HTMLToMarkdown = (htmlString) => {
	htmlString = decodeHTMLEntities(htmlString);

	const markdownRegex = [
		['<u>|</u>', '_'],
		['<strong>|</strong>', '**'],
		['<em>|</em>', '*']
	];

	for (let regexStr of markdownRegex) {
		const regex = new RegExp(regexStr[0], 'gm');
		while (regex.test(htmlString)) {
			htmlString = htmlString.replace(regex, regexStr[1]);
		}
	}

	return htmlString;
};

function decodeHTMLEntities(text) {
	var textarea = document.createElement('textarea');
	textarea.innerHTML = text;
	return textarea.value;
}

export function HTMLToText(html) {
	let out = '';
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');
	const cardNodes = (doc.body && doc.body.children) || null;
	if (!cardNodes) return;
	Array.from(cardNodes).forEach(function (node, index) {
		if (node.firstChild === null) {
			out += '\n';
		} else {
			let text = HTMLToMarkdown(node.innerHTML);
			text = text.replaceAll(/&nbsp;/g, ' ');
			out += text + '\n\n';
		}
	});
	out = out.replace(/(<([^>]+)>)/gi, '');
	return out;
}

function textToHTML(text) {
	// Split the text by double newlines to handle paragraphs
	let paragraphs = text.split(/\n\n/);

	// Process each paragraph
	let html = paragraphs
		.map((paragraph) => {
			// Split lines within the paragraph
			let lines = paragraph.split('\n');

			// Wrap each line in a <p> tag
			let wrappedLines = lines.map((line) => `<p>${line}</p>`).join('');

			// Return the processed paragraph
			return wrappedLines;
		})
		.join('<p><br></p>'); // Join paragraphs with a blank line in between

	return html;
}

function domParser(html) {
	// Define the tags to process
	const tagsToProcess = ['scene', 'char', 'dia', 'pars', 'synopsis', 'section', 'trans', 'action'];

	// Create a DOM parser
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, 'text/html');

	// Result to collect all matching content
	let result = '';

	// Recursive function to process nodes
	function processNode(node) {
		if (node.nodeType === Node.ELEMENT_NODE) {
			const tagName = node.tagName.toLowerCase();

			if (tagsToProcess.includes(tagName)) {
				// Add the innerHTML as text with a trailing newline
				result += node.innerHTML.trim() + '\n';
			} else if (tagName === 'card') {
				// Add a newline for card, but skip its content
				result += '\n';
			}
		}

		// Recursively process child nodes
		node.childNodes.forEach((child) => processNode(child));
	}

	// Start processing from the document body
	processNode(doc.body);

	return result;
}

export const textParsers = {
	HTMLToText,
	HTMLToMarkdown,
	markdownToHTML,
	textToHTML,
	domParser
};
