<script>
  import { _app } from "$lib";
  export let card;
  import CollapseButton from "./CollapseButton.svelte";
  import { scrollToCardById } from "$lib";
  import CardText from "./CardText/CardText.svelte";

  function click() {
    $_app.currentCard.id = card.id;
    scrollToCardById(card.id, "smooth");
  }

  function handleKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      click();
    }
  }

  $: depth =
    card?.dependencyInfo.parentCardDepth * 10 -
    (!card?.section.isSection && card?.dependencyInfo.parentCardDepth ? 12 : 0);
</script>

<div
  class:d-none={card.dependencyInfo.hasCollapsedParent}
  class="d-flex w-100 mb-2 align-items-top sidecard"
  style="padding-left:{depth}px;"
>
  <CollapseButton {card} />

  <div
    tabindex="0"
    class:selected={$_app.currentCard.id == card?.id}
    on:click={click}
    on:keydown={handleKeydown}
    role="button"
    class="sidecard-inner rounded flex-grow-1 p-2"
  >
    <div class="title ps-2">
      <CardText lineText={card?.firstLine?.textContent} />
    </div>
  </div>
</div>

<style>
  .title {
    min-height: 25px;
  }
</style>
