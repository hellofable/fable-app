<script>
	import { NodeViewWrapper, NodeViewContent } from 'svelte-tiptap';
	import { _app, _cards } from '$lib'; // Import your store
	import CollapseButton from './CollapseButton.svelte';
	import Dropdown from './Dropdown/Dropdown.svelte';

	export let node, editor, decorations, selected, extension, getPos, deleteNode, updateAttributes;

	$: isSection = node.textContent.startsWith('#') ? 'is-section' : '';
	$: isSelected = $_app.currentCard.id == node.attrs.id ? 'selected-card' : '';

	let cardId = node.attrs.id;

	let card;
	$: if ($_cards) {
		card = $_cards.find((card) => card.id == cardId);
	}

	let display = 'd-flex';
	$: if (card && card.dependencyInfo.hasCollapsedParent) {
		display = 'd-none';
	} else {
		display = 'd-flex';
	}

	let isSection = '';
	let parentCardDepth = 0;
	$: isSection = card?.section.isSection ? 'is-section' : 'is-not-section';
	$: parentCardDepth = `parentdepth-${card?.dependencyInfo.parentCardDepth}`;

	$: depth = $_app.view.mode == 'cards' ? 0 : card?.dependencyInfo.parentCardDepth * 10;

	// $: console.log(card);
</script>

<NodeViewWrapper
	{...node.attrs}
	id={node.attrs.id}
	class="{display} {isSection} {parentCardDepth} fable-card"
	style="margin-left:{depth}px;"
>
	<div class="dropdown-wrapper d-none"><Dropdown {getPos} {node} /></div>
	{#if card}
		<div contenteditable="false"><CollapseButton {card} /></div>
	{/if}
	<div class="w-100 fable-card-inner p-3 rounded">
		<NodeViewContent />
	</div>
	{#if card?.pages?.display}
		<div contenteditable="false" class="page-count text-end">{card?.pages?.display}.</div>
	{/if}
</NodeViewWrapper>

<style>
	.fable-card-inner {
		background: rgba(120, 120, 120, 0.092);
	}
	.page-count {
		position: absolute;
		bottom: 7px;
		right: 11px;
		opacity: 0.6;
	}

	.dropdown-wrapper {
		position: absolute;
		top: 8px;
		right: 0;
	}
</style>
