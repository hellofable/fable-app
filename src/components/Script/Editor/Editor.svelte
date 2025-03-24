<script>
  // @ts-nocheck
  import * as Y from "yjs";

  import EditScriptButton from "/src/components/Scripts/Content/ScriptCardsAndFolders/ScriptCards/ScriptCard/Dropdown/EditScriptButton.svelte";

  import { onDestroy, onMount, tick } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "./code/starterKit/starterKit";
  import Collaboration from "@tiptap/extension-collaboration";
  import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
  import { extensions } from "./code/extensions/index.js";
  import { schema } from "./code/schema";
  import { collab } from "./code/collab.js";
  import { pb, convertTextToHtml } from "$lib";
  import { insertCard } from "./code/insertCard.js";
  import { _editor, _app, _user, _script } from "$lib";
  import { onEditorStart } from "./code/onEditorStart.js";
  let editorElement, editor;

  let globalProvider, globalYDoc;
  export let script;

  onMount(async () => {
    const { provider, ydoc } = await collab(script.id);
    globalProvider = provider;
    globalYDoc = ydoc;
    // Create a Y.js document

    const extns = [
      StarterKit,
      ...schema,
      ...extensions,
      Collaboration.configure({ document: ydoc }),
      CollaborationCursor.configure({
        provider: provider,
        user: { name: $_user.name, color: "#cccccc" },
      }),
    ];

    // Initialize the Tiptap editor
    editor = new Editor({
      element: editorElement,
      extensions: extns,
      content: null,
      parseOptions: {
        preserveWhitespace: "full",
      },
    });

    // Expose the editor instance globally (optional)
    window.editor = editor;
    _editor.set(editor);

    provider.on("connect", async () => {
      // console.log('connect');
    });

    provider.on("sync", async (isSynced) => {
      if (isSynced) {
        console.log("Document is ready and synced with server!");

        await onEditorStart(editor);

        const syncedHtml = editor.getHTML();
        if (!syncedHtml) {
          insertCard();
        }
      }
    });
  });

  onDestroy(() => {
    // console.log('Destroying provider:', globalProvider);
    _script.set(null);
    if (globalProvider) {
      globalProvider.disconnect();
      globalProvider.destroy();
      globalProvider = null; // Ensure it’s not referenced anymore
    }

    if (globalYDoc) {
      globalYDoc.destroy();
      globalYDoc = null; // Ensure it’s cleared
    }
  });
</script>

<div class="script-details-wrapper">
  <div class="fs-3">{$_script?.title}</div>
  <div class="lead">{script.synopsis}</div>
  <EditScriptButton script={$_script} />
</div>

<div
  bind:clientWidth={$_app.editorWidth}
  id="fable-editor"
  class="w-100"
  bind:this={editorElement}
/>

<style>
  .script-details-wrapper {
    line-height: 1.2;
  }
</style>
