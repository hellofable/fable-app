<script>
  import { onDestroy, onMount } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "./code/starterKit/starterKit";
  import { schema } from "./code/schema";
  import { notesDecorations } from "../../../Script/Editor/code/extensions/notesDecorations";
  import { addModifierClass } from "../../../Script/Editor/code/extensions/addModifierClass";

  import { _editor, _script } from "$lib";

  let editorElement, editor;
  export let json = {};
  export let script;

  onMount(async () => {
    const extns = [StarterKit, ...schema, notesDecorations, addModifierClass];

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
</script>

<div class:d-none={!$script.id} class=" flex-shrink-1 flex-grow-1 mt-2 px-2">
  <div bind:this={editorElement} />
</div>
