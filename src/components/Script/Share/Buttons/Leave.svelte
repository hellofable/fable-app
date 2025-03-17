<script>
  import { router } from "tinro";
  import { _script, _user, _modal, pb, showPopup, _scripts } from "$lib";
  import { onMount } from "svelte";
  let scriptId, userId, token;

  async function showConfirm() {
    const result = await showPopup({
      title: "Leave Share?",
      bodyMessage:
        "You will need to be added again by the owner to access this script.",
      confirmButton: {
        title: "Leave",
      },
    });

    // Based on the user decision, change the state
    if (result.message === "confirmed") {
      _modal.close();
      result.popup.hide();
      const scripts = _scripts.get();
      const updatedItems = scripts.filter((item) => item.id !== scriptId);
      _scripts.set(updatedItems);
      router.goto("/scripts");
      const left = await leaveShare();
    }
  }

  onMount(() => {
    scriptId = $_script.id;
    userId = $_user.id;
    token = pb.authStore.token;
  });

  async function leaveShare() {
    try {
      const response = await fetch("/api/scripts/leaveShare", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ scriptId, userId }),
      });

      const data = await response.json();
      // const data = { success: true };
      if (data.success) {
        return true;
      } else {
        alert("Error: " + data.message);
        return false;
      }
    } catch (error) {
      console.error("Error leaving share:", error);
      return false;
    }
  }
</script>

<button class="btn btn-sm btn-danger" on:click={showConfirm}>Leave Share</button
>
