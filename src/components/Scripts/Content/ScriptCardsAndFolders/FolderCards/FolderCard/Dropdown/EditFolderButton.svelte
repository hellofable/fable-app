<script>
  import { meta } from "tinro";
  const route = meta();

  import { _modal, pb } from "$lib";
  import Form from "/src/components/Other/Form.svelte";
  export let folder;

  function clickEdit(event) {
    event.stopPropagation();
    event.preventDefault();

    _modal.open(Form, {
      title: "New Folder",
      buttons: {
        submit: {
          title: "Update Folder",
          class: "btn-primary",
          showLabel: false,
        },
      },
      componentProps: {
        fields: [
          {
            name: "folderName",
            defaultValue: folder.name,
            type: "text",
            placeholder: "Enter folder name",
            required: true,
          },
        ],
        onSubmit: async (data) => {
          $_modal.isSubmitting = true;
          const fields = {
            name: data.folderName,
            folderId: $route.params.folderId || "root",
          };
          const res = await pb.db.folders.update(folder.id, fields);

          if (!res.success) {
            console.log(res);

            console.error("Error inserting folder:", { message: res.message }); // Debugging
            $_modal.isSubmitting = false;
            alert(res.message);
            _modal.close();
            return;
          }

          _modal.close();
        },
      },
    });
  }
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a on:click={clickEdit} class="dropdown-item" href="">Update Folder</a>
