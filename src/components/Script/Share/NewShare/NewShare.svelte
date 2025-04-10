<script>
  import EasyForm from "/src/components/Other/EasyForm.svelte";
  import ToggleShare from "./ToggleShare.svelte";
  let show = false;
  import { _script, pb, toast } from "$lib";

  async function handleSubmit(data) {
    console.log("add shared");

    props.disabled = true;
    const { email } = data;
    const scriptId = $_script.id;

    const res = await pb.db.scripts.addShare({ scriptId, email });
    props.disabled = false;

    if (res.success) {
      // show = false;
      toast({ type: "success", message: "Share added successfully" });
      return res;
    }
    if (!res.success) {
      toast({ type: "error", message: res.message });
      return res;
    }
  }

  let props = {
    submitTitle: "Add Share",
    submitClass: "btn-primary btn-sm",
    disabled: false,
  };
  let fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Enter email of share recipient",
      required: true,
      showLabel: false,
    },
  ];
</script>

<div class="addNewShare rounded p-3">
  <div class="d-flex">
    <div class="me-2"><ToggleShare bind:show /></div>
  </div>
  {#if show}
    <div class="mt-3">
      <EasyForm bind:fields bind:props onSubmit={handleSubmit} />
    </div>
  {/if}
</div>

<style>
  .addNewShare {
    background: rgba(129, 129, 129, 0.1);
  }
</style>
