<script>
  export let lineText;

  import { onMount } from "svelte";
  let paresedText = "";

  $: if (lineText && lineText.startsWith("#")) {
    paresedText = "";
    lineText = lineText.replace(/^#+/, ""); // This line strips leading #s

    paresedText += '<div class="sidecard-section">';
    paresedText += lineText;
    paresedText += "<div/>";
  } else {
    paresedText = lineText;
  }
</script>

{@html paresedText}

<style>
</style>
