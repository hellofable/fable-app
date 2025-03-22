<script>
  import { meta } from "tinro";

  const route = meta();

  import { _modal, pb, _user } from "$lib";
  import Form from "/src/components/Other/Form.svelte";

  function clickAdd(event) {
    _modal.open(Form, {
      title: "Import Text",
      buttons: {
        submit: {
          title: "Import",
          class: "btn-primary",
          showLabel: false,
        },
      },
      componentProps: {
        fields: [
          {
            name: "scriptFile",
            id: "script-file",
            type: "file",
            required: true,
            showLabel: false,
          },
          {
            id: "template",
            name: "template",
            type: "select",
            showLabel: false,
            required: true,
            defaultValue: "none",
            options: [
              {
                value: "none",
                label: "No Template",
                helperText: "Do not apply a template to this script.",
              },
              {
                value: "fableFourAct",
                label: "Fable Four Act",
                helperText: `Follows a timeless four-act structure—Setup, Initiation, Crisis, and Resolution—with a fresh take on character transformation. It balances external trials, internal growth, and a B-Story that enriches the narrative.`,
              },
            ],
          },
        ],

        onSubmit: async (data) => {
          $_modal.isSubmitting = true;

          if (!data.scriptFile) {
            _modal.close();
            return;
          }

          if (data.template == "none") {
            // Call the import function
            const res = await pb.db.scripts.importFromText(
              data.scriptFile.filename,
              data.scriptFile.content
            );
            if (res?.success) _modal.close();
          }

          if (data.template != "none") {
            // addSectionsToScriptText({
            //   scriptText: data.scriptFile.content,
            //   templateName: data.template,
            // });
            _modal.close();
          }
        },
      },
    });
  }
</script>

<a class="dropdown-item" on:click={clickAdd} href={null}> Import Text </a>
