<script>
  import { meta } from "tinro";
  import { storymaps, _route } from "$lib";
  const route = meta();

  import { _modal, pb, _user } from "$lib";
  import Form from "/src/components/Other/Form.svelte";

  function clickAdd(event) {
    _modal.open(Form, {
      title: "New Script",
      buttons: {
        submit: {
          title: "New Script",
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
          },
          {
            name: "synopsis",
            type: "textarea",
            placeholder: "Enter script synopsis",
            required: true,
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
                helperText: "Start with just a blank script.",
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

          let fields = {
            title: data.title,
            synopsis: data.synopsis || "",
            folderId: $route.params.folderId || "root",
          };

          if (data.template === "fableFourAct") {
            const startingHtml = await storymaps.get.html("fableFourAct");
            console.log(startingHtml);

            fields.import = startingHtml;
          }

          // save the script
          const res = await pb.db.scripts.insert(fields);

          // update the user script counter & close the modal
          if (res?.success) _modal.close();
        },
      },
    });
  }
</script>

<a class="dropdown-item" on:click={clickAdd} href={null}> Screenplay </a>
