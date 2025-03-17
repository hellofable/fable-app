import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import CardNode from '../CardNode/CardNode.svelte';

const Card = Node.create({
	name: 'card',
	group: 'block',
	atom: false,
	inline: false,
	isolating: false,
	content: 'line+', // Allow multiple Line nodes instead of paragraph,

	addAttributes() {
		return {
			// issection: {
			//     default: false
			// },
			// sectioncollapsed: {
			//     default: false,  // Add id attribute to support unique IDs
			// },
			id: {
				default: null
			},
			pagenumber: {
				default: null
			}
		};
	},

	parseHTML() {
		return [{ tag: 'card' }];
	},

	renderHTML({ HTMLAttributes }) {
		return ['card', mergeAttributes(HTMLAttributes), 0];
	},

	addNodeView() {
		return SvelteNodeViewRenderer(CardNode);
	}
});

// Define the Line node with custom tags
export const Line = Node.create({
	name: 'line',
	group: 'block',
	inline: false,
	selectable: true,
	content: 'text*',
	id: {
		default: null // Add id attribute to support unique IDs
	},

	// addAttributes() {
	//     return {
	//         type: {
	//             default: "scene",  // Add id attribute to support unique IDs
	//         },
	//         id: {
	//             default: null
	//         }
	//     };
	// },
	addAttributes() {
		return {
			type: {
				default: 'action', // Default type if none specified
				parseHTML: (element) => element.tagName.toLowerCase(),
				renderHTML: (attributes) => ({ class: attributes.type }) // Assign type class
			},
			id: {
				default: null
			},
			class: {
				// Add the class attribute here
				default: null
			}
		};
	},

	parseHTML() {
		return [
			{ tag: 'scene' },
			{ tag: 'char' },
			{ tag: 'dia' },
			{ tag: 'pars' },
			{ tag: 'synopsis' },
			{ tag: 'section' },
			{ tag: 'trans' },
			{ tag: 'action' }
		];
	},

	renderHTML({ node, HTMLAttributes }) {
		return [
			node.attrs.type,
			mergeAttributes(HTMLAttributes, { class: `line ${node.attrs.type}` }),
			0
		];
	}
});

// Define the Document node
export const Document = Node.create({
	name: 'document',
	topNode: true,
	content: 'card*' // Document now only allows Card nodes
});

// Export the updated schema
export const schema = [
	Document,
	Card,
	Line // Include the custom Line node instead of Paragraph
];
