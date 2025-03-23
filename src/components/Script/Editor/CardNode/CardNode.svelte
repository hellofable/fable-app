<script>
  import { NodeViewWrapper, NodeViewContent } from "svelte-tiptap";
  import { getCardNodeAtPos } from "../code/helpers";
  import { _app, _cards, createNested } from "$lib";
  import CollapseButton from "./CollapseButton.svelte";
  import Dropdown from "./Dropdown/Dropdown.svelte";
  export let node,
    editor,
    decorations,
    selected,
    extension,
    getPos,
    deleteNode,
    updateAttributes;

  let card;

  // $: console.log(card);

  $: if ($_cards) {
    card = $_cards.find((card) => card.id == node.attrs.id);
  }

  let display = "";
  let isSection = "";
  let isSelectedCard = "";
  let isCollapsed = "";
  let hasCollapsedParent = "";
  let cardDepth = "";

  $: if (card) {
    display = card.dependencyInfo?.hasCollapsedParent ? "d-none" : "d-flex";
    isSection = card.section?.isSection ? "is-section" : "is-not-section";
    isSelectedCard = $_app.currentCard.id == card.id ? "selected-card" : "";
    isCollapsed =
      card.section?.sectionCollapsed && card.section?.isSection
        ? "collapsed"
        : "";
    hasCollapsedParent = card.dependencyInfo?.hasCollapsedParent
      ? "has-collapsed-parent"
      : "";
    cardDepth = `card-depth-${card.depth}`;
  }

  function addCard() {
    const cardNode = getCardNodeAtPos(getPos());
    const endPos = getPos() + cardNode.nodeSize - 2;

    editor.commands.insertContentAt(endPos, {
      type: "card",
      content: [
        {
          type: "line",
          attrs: { type: "action" },
          content: [{ type: "text", text: "This is a line inside a card!" }],
        },
      ],
    });
  }
</script>

<NodeViewWrapper id={node.attrs.id}>
  <div contenteditable="false" class="card-dropdown">
    <Dropdown {node} {getPos} />
  </div>
  <div
    class="fable-card d-flex w-100 {isSection} {isCollapsed} {isSelectedCard} align-items-start overflow-y-scroll"
  >
    {#if card && card.section && card.section.isSection}
      <div class="me-2"><CollapseButton {card} /></div>
    {/if}
    <div
      class:is-section={card?.section?.isSection}
      class="node-content flex-grow-1"
    >
      <NodeViewContent />
    </div>
  </div>
</NodeViewWrapper>

<style>
  .node-content.is-section {
    margin-top: 9px;
  }

  .card-dropdown {
    position: absolute;
    top: 11px;
    right: 15px;
  }
</style>
