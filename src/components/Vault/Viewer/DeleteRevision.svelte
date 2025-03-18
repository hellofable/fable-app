<script>
  import { router } from "tinro";
  import { showPopup, _user, pbCheckpoints, _popup, toast } from "$lib";
  export let backup;

  async function deleteBackup() {
    const res = await showPopup({
      title: "Delete Backup Forever",
      bodyMessage: "Are you sure you want to delete this backup?",
      confirmButton: {
        title: "Delete Forever",
        class: "btn-danger",
      },
    });
    if (res.message == "confirmed") {
      console.log("confirmed");

      try {
        res.popup.isSubmitting(true);
        const checkpointResult = await pbCheckpoints.removeCheckpoint({
          docId: $backup.id,
        });
      } catch (error) {
        console.error("Error removing checkpoint:", error);
      } finally {
        res.popup.hide();
        document.getElementById(`backup-${$backup.id}`).remove();
        // toast({ type: 'success', message: 'Backup deleted successfully' });

        setTimeout(() => {
          res.popup.isSubmitting(false);
        }, 1000);
      }

      router.goto("/scripts");
    }
  }
</script>

<a
  class:d-none={$_user.settings.vault.deleteProtect}
  on:click={deleteBackup}
  href={null}
  class="link-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover small ms-2"
>
  Delete Revision
</a>

<style>
  a {
    cursor: pointer;
  }
</style>
