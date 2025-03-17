<script>
  import { meta } from "tinro";
  const route = meta();

  import { _modal } from "$lib";
  import Form from "/src/components/Other/Form.svelte";

  export let script;

  function clickEdit(event) {
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

<!-- svelte-ignore a11y-invalid-attribute -->
<a on:click={clickEdit} class="dropdown-item" href="">Update Script</a>
