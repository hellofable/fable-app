<script>
  export let script;
  import { pb, _app, showPopup, toast } from "$lib";

  async function click() {
    const res = await showPopup({
      title: "Restore Script",
      bodyMessage: "Script will be restored to home folder.",
      confirmButton: {
        title: "Restore",
      },
    });

    if (res.message == "confirmed") {
      const updatedData = {
        deleted: false,
        folderId: "root",
      };
      res.popup.isSubmitting(true);
      // const updatedRecord = await pb.collection('scripts').update(script.id, updatedData);
      const updatedRecord = await pb.db.scripts.update(script.id, updatedData);

      res.popup.hide();
      setTimeout(() => {
        res.popup.isSubmitting(false);
      }, 500);
    }
  }
</script>

<a
  class:d-none={!script.deleted}
  on:click={click}
  href={null}
  class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover small ms-2"
>
  Restore
</a>
