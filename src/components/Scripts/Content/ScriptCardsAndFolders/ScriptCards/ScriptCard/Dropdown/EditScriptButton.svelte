<script>
  import { meta } from "tinro";
  const route = meta();

  import { _modal } from "$lib";
  import Form from "/src/components/Other/Form.svelte";

  export let script;

  function clickEdit(event) {
    event.stopPropagation();
    event.preventDefault();
    _modal.open(Form, {
      title: "New Script",
      buttons: {
        submit: {
          title: "Update",
          class: "btn-primary",
          showLabel: false,
        },
      },
      componentProps: {
        fields: [
          {
            name: "title",
            type: "text",
            placeholder: "Enter script name",
            required: true,
            defaultValue: script.title,
          },
          {
            name: "synopsis",
            type: "textarea",
            placeholder: "Enter script synopsis",
            required: true,
            defaultValue: script.synopsis,
          },
        ],

        onSubmit: async (data) => {
          const fields = {
            title: data.title,
            synopsis: data.synopsis || "",
            inTrash: false,
            folderId: $route.params.folderId || "root",
          };
          $_modal.isSubmitting = true;
          const res = await pb.db.scripts.update(script.id, fields);
          if (res?.success) _modal.close();
        },
      },
    });
  }
</script>

{#if $route.url.startsWith("/scripts")}
  <a on:click={clickEdit} class="dropdown-item" href={null}>Update Script</a>
{/if}

{#if $route.url.startsWith("/script/")}
  <a on:click={clickEdit} class="edit-link small" href={null}> (edit) </a>
{/if}

<style>
  .edit-link {
    cursor: pointer;
    position: relative;
    opacity: 0.3;
  }
  .edit-link:hover {
    opacity: 0.6;
  }
</style>
