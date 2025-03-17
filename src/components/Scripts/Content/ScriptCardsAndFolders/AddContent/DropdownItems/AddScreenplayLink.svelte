<script>
  import { meta } from "tinro";
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
        ],

        onSubmit: async (data) => {
          $_modal.isSubmitting = true;

          let fields = {
            title: data.title,
            synopsis: data.synopsis || "",
          };

          // save the script
          const res = await pb.db.scripts.insert(fields);
          console.log(res);

          // update the user script counter & close the modal
          if (res?.success) _modal.close();
        },
      },
    });
  }
</script>

<a class="dropdown-item" on:click={clickAdd} href=""> Screenplay </a>
