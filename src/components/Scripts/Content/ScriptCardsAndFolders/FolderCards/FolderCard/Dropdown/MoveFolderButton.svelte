<script>
  import { _modal, _folders } from "$lib";
  import Form from "/src/components/Other/Form.svelte";

  import MoveFolder from "../../../MoveFolder/MoveFolder.svelte";
  export let folder;

  function clickEdit(event) {
    event.stopPropagation();
    event.preventDefault();

    _modal.open(MoveFolder, {
      title: "Move Folder",
      buttons: {
        submit: {
          title: "Move Folder",
          class: "btn-primary",
          showLabel: false,
          hidden: false,
        },
      },
      componentProps: {
        fields: {
          folderId: folder.id,
        },
        onSubmit: async (data) => {
          $_modal.isSubmitting = true;

          const folderToMoveTo =
            $_modal.selectedFolder === "home" ? "root" : $_modal.selectedFolder;

          $_modal.isSubmitting = true;
          const fields = {
            folderId: folderToMoveTo,
          };
          const res = await pb.db.folders.update(folder.id, fields);
          if (!res.success) {
            console.error("Error moving folder:", { message: res.message }); // Debugging
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
<a on:click={clickEdit} class="dropdown-item" href="">Move Folder</a>
