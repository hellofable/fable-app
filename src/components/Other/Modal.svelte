<script>
  import { _modal } from "$lib";
</script>

{#if $_modal.show}
  <div class="modal-backdrop">
    <div class="modal show d-block" tabindex="-1">
      <div class="modal-dialog">
        <div
          class:d-none={$_modal.params.hidden}
          class="modal-content border-0"
        >
          <div class:d-none={$_modal.params.hideHeader} class="modal-header">
            <div
              class="d-flex justify-content-between w-100 align-items-center"
            >
              <div class="modal-title fs-5">
                {$_modal.params.title || "Modal Title"}
              </div>
              <div>
                {#if $_modal.params.titleBadge}
                  <span
                    class={`me-2 badge bg-${$_modal.params.titleBadge.color || "secondary"}`}
                  >
                    {$_modal.params.titleBadge.text || "Badge"}
                  </span>
                {/if}
              </div>
            </div>
            <button
              type="button"
              class="btn-close d-none"
              on:click={() => {
                _modal.close();
              }}
            ></button>
          </div>
          <div class="modal-body">
            {$_modal.params.bodyMessage || ""}

            {#if $_modal.Component}
              <svelte:component
                this={$_modal.Component}
                props={$_modal.params?.componentProps}
              />
            {/if}
          </div>
          <div class="modal-footer border-0">
            <button
              type="button"
              class="btn btn-secondary"
              on:click={() => {
                _modal.close();
              }}>Close</button
            >
            {#if $_modal.params.buttons?.submit}
              <button
                disabled={$_modal.isSubmitting}
                form="form-component"
                type="submit"
                class="btn {$_modal.params.buttons.submit.class} submit-button"
              >
                {#if $_modal.isSubmitting}
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                {:else}
                  {$_modal.params.buttons.submit.title || "Submit"}
                {/if}
              </button>
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    background: rgba(0, 0, 0, 0.5);
  }
</style>
