<script>
  import { _app } from "$lib";

  // Wrap logic in a reactive statement to ensure it's properly updated when `_app.toast` changes.
  $: if ($_app?.toast?.show) {
    const toastElement = document.getElementById("bootstrap-toast");
    if (toastElement && window.bootstrap?.Toast) {
      const toast = new bootstrap.Toast(toastElement); // Initialize the toast
      toast?.show(); // Show the toast
      // Reset the toast state after showing it
      $_app.toast.show = false;
    } else {
      console.warn("Toast element or bootstrap.Toast is not available.");
    }
  }
</script>

<div
  id="toast-container"
  aria-live="polite"
  aria-atomic="true"
  class="position-fixed top-0 end-0 p-3"
  style="z-index: 1050;"
>
  <!-- Toast -->
  <div
    data-bs-delay="3000"
    id="bootstrap-toast"
    class="toast border-0"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header border-0">
      <strong class="me-auto text-success">Success</strong>
    </div>
    <div class="toast-body">Your script was sent to the trash.</div>
  </div>
</div>
