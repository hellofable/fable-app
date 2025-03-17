import { splitTextIntoCards } from '$lib';

export function convertTextToHtml(text) {
	const cards = splitTextIntoCards(text);
	let html = '';

	cards.forEach((card) => {
		html += `<div class="card">`;

		// Split the card content by newlines
		const lines = card.trim().split('\n');

		lines.forEach((line) => {
			html += `<action>${line}</action>`;
		});

		html += `</div>`;
	});

	return html;
}
