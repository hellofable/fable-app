<script>
  import { meta } from "tinro";
  const route = meta();

  import { _modal, pb } from "$lib";
  import Form from "/src/components/Other/Form.svelte";

  function clickAdd(event) {
    _modal.open(Form, {
      title: "New Folder",
      buttons: {
        submit: {
          title: "New Folder",
          class: "btn-primary",
          showLabel: false,
        },
      },
      componentProps: {
        fields: [
          {
            name: "folderName",
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

          let res = await pb.db.folders.insert(fields);

          if (!res.success) {
            console.error("Error inserting folder:", { message: res.message }); // Debugging
            $_modal.isSubmitting = false;
            alert(res.message);
            _modal.close();
            return; // Early return to prevent further execution
          }

          _modal.close(); // Runs only if success
        },
      },
    });
  }
</script>

<a class="dropdown-item" on:click={clickAdd} href="">Folder </a>
