<script>
  // @ts-nocheck  import * as Y from 'yjs';

  import { onDestroy, onMount } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "./code/starterKit/starterKit";
  import { schema } from "./code/schema";

  import { _editor, _script } from "$lib";

  let editorElement, editor;
  export let json;

  onMount(async () => {
    const extns = [StarterKit, ...schema];

    // Initialize the Tiptap editor
    editor = new Editor({
      element: editorElement,
      extensions: extns,
      content: null,
      editable: false,
    });

    if (!json) return;
    const doc = JSON.parse(json);
    if (!doc.content) return;

    editor.commands.setContent(doc.content);
  });

  onDestroy(() => {
    console.log("Destroying provider");
  });

  function applyDelta(state) {
    const newState = Uint8Array.from(atob(state), (c) => c.charCodeAt(0));

    Y.applyUpdate(ydoc, newState);

    // Y.applyUpdate(ydoc, newState);
  }

  let currentDelta = 0;
  function applyNextDelta() {
    if (currentDelta < checkpointWithDeltas.deltas.length) {
      console.log(checkpointWithDeltas.deltas[currentDelta]);

      console.log("Applying delta", currentDelta);
      applyDelta(checkpointWithDeltas.deltas[currentDelta].state);
      currentDelta++;
    }
  }
</script>

<div class="viewew-editor" bind:this={editorElement} />

<style>
  .viewew-editor {
    font-size: 14px;
    font-family: monospace;
  }
</style>
