<script>
  import { meta, router } from "tinro";
  const route = meta();

  import { showPopup, pb } from "$lib";
  export let backup;
  export let script;

  async function restore() {
    console.log(backup);

    const popup = await showPopup({
      title: "Restore this document?",
      bodyMessage:
        "This will create a new document in your scripts folder with this revision.",
      confirmButton: {
        title: "Restore",
      },
    });

    if (popup.message == "confirmed") {
      let fields = {
        title: $script.title + " (restored)",
        synopsis: $script.synopsis || "",
        folderId: $route.params.folderId || "root",
        importJson: backup.file,
      };

      const res = await pb.db.scripts.insert(fields);

      router.goto("/scripts");
      popup.popup.hide();
    }
  }
</script>

<a
  on:click={restore}
  href=""
  class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover small"
>
  Restore Revision
</a>
