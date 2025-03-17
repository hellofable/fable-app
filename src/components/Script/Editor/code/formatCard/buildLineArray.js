import { determineLineType } from './determineLineType';

export function buildLineArray(cardNode) {
	const lineArray = [];

	cardNode.forEach((lineNode, lineOffset, index) => {
		if (lineNode.type.name === 'line') {
			const lineText = lineNode.textContent;

			// Get next line’s text if it exists
			const nextLineNode = index + 1 < cardNode.childCount ? cardNode.child(index + 1) : null;
			const nextLineText = nextLineNode ? nextLineNode.textContent : null;

			// Get previous line information from the last item in the array
			const prevLineData = lineArray[index - 1] || {};
			const prevLineText = prevLineData.lineText || null;
			const prevLineType = prevLineData.lineType || null;
			const prevLineExists = index > 0;

			// Determine line type based on current context
			const lineType = determineLineType({
				lineText,
				prevLineType,
				prevLineText,
				prevLineExists,
				nextLineText
			});

			// Push the line data with the determined lineType to the array
			lineArray.push({
				lineText,
				prevLineType,
				prevLineText,
				prevLineExists,
				nextLineText,
				lineType
			});
		}
	});

	return lineArray;
}
