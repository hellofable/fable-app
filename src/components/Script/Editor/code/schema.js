import { Node, mergeAttributes } from '@tiptap/core';
import { SvelteNodeViewRenderer } from 'svelte-tiptap';
import CardNode from '../CardNode/CardNode.svelte';

const Card = Node.create({
	name: 'card',
	group: 'cardgrid',
	content: 'line+',
	addAttributes() {
		return {
			id: { default: null },
			pagenumber: { default: null }
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
				// renderHTML: (attributes) => ({ class: attributes.type }) // Assign type class
				renderHTML: (attributes) => ({}) // Assign type class

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
			// mergeAttributes(HTMLAttributes, { class: `line ${node.attrs.type}` }),
			mergeAttributes(HTMLAttributes, { class: `line` }),

			0
		];
	}
});

const Document = Node.create({
	name: 'document',
	topNode: true,
	content: 'cardgrid*' // Ensures only one or more `cardgrid` nodes
});

const CardGrid = Node.create({
	name: 'cardgrid',
	group: 'block',
	content: 'card+ cardgrid*', // Must contain at least one `card`, and can contain more `cardgrid`s
	parseHTML() {
		return [{ tag: 'cardgrid' }];
	},
	renderHTML({ HTMLAttributes }) {
		return ['cardgrid', mergeAttributes(HTMLAttributes), 0];
	}
});

export const schema = [Document, CardGrid, Card, Line];
